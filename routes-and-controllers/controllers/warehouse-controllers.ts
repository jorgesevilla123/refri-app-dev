import { Request, Response } from "express";
import Warehouse, { warehouseInterface } from "../../models/warehouse-model";
import Products, { ProductInterface } from "../../models/products-model";
import { redisClient } from "./products-controllers";
import {ObjectID} from 'mongodb'




function paginate(
    totalItems: number,
    currentPage: any,
    pageSize: number,
    maxPages: number = 10
) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);



    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: parseInt(currentPage),
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}









export const getWarehouse = (req: Request, res: Response) => {
    const itemsPerPage = 40
    var page : any= req.query.page

    Warehouse.find( ( err, warehouses) => {
        if( err ) {
            res.json({ message: 'Error buscando los almacenes', err})
            console.log(err);
        }
        else {
        
            res.json(warehouses);
        }
    })
    
}





export const getOneWarehouse = (req: Request, res: Response) => {
    const id = req.params.id
    const itemsPerPage = 40
    var page : any = req.query.page || 1

    Warehouse.findOne({_id: id}, ( err, warehouse) => {
        if( err ) {
            res.json({ message: 'Error buscando los almacenes', err})
            console.log(err);
        }
        else {
            let pageInt = parseInt(page);
            let pager = paginate(warehouse.products.length, pageInt, itemsPerPage);

            const pageOfItems = warehouse.products.slice(pager.startIndex, pager.endIndex + 1)

            res.json({warehouse, current: page, pages: Math.ceil(warehouse.products.length / itemsPerPage), pageOfItems, pager});
        }
    })
    
}





export const searchWarehouse = (req: Request, res: Response) => {
    const searchQuery = req.query.q;

    Warehouse.find({ warehouse_name: new RegExp(`${searchQuery}`, 'gi')}, (err, warehouses) => {
        if(err) {
            res.json({ message: 'Error en la busqueda de almacenes'})
        }
        else {
            res.json(warehouses);

        }
    })

    
    
}


export const searchWarehouseProducts = (req: Request, res: Response) => {
    const query = req.query.q;
    const id = req.params.id
    var warehouseId = new ObjectID(`${id}`)
    let regex = new RegExp(`${query}`,'gi')
    var page: any = req.query.page || 1;
    const itemsPerPage = 40;
    var pageToint = parseInt(page);
    

    Warehouse.aggregate([
        {'$match': {'_id': warehouseId}},
        {'$project': {"warehouse_location": 0, '_id': 0}},
        {'$unwind': '$products'},
        {'$match': { '$or': [{'products.title': regex}, {'products.modelo': regex}]   }}

    ], (err, products) => {
        if(err) {
            res.json({message: 'Error retrieveng the products', err})
        }
        else {
            let pager = paginate(products.length, pageToint, itemsPerPage);
            const pageOfItems = products.slice(pager.startIndex, pager.endIndex + 1)
            res.json({current: page, pages: Math.ceil(products.length / itemsPerPage), pageOfItems, pager});
        }
    })

    
    
}










export const addWarehouse = (req: Request, res: Response) => {

    const {warehouse_location, warehouse_name} = req.body

            const newWarehouse = new Warehouse({warehouse_location, warehouse_name})
            newWarehouse.save( (err, warehouse) => {
                if(err) {
                    res.json({message: 'Error guardando almacen', sucess: false});
                }
                else {
                res.json({message: 'Almacen guardado!', warehouse, success: true});
            }
                    
            })
}    





export const addProductToWarehouse = (req: Request, res: Response) => {

    const product = req.body.product;
    const id = req.params.id



    Warehouse.findOneAndUpdate({_id: id}, {$push: { products: product}}, {new: true}, (err, warehouse) => {
        if(err) {
            res.json({ message: 'Error agregando producto', err})
        }
        else {
            res.json({message: "Producto agregado", warehouse});
        }
    })
}    





export const removeProductFromWarehouse = (req: Request, res: Response) => {

    const productId= req.body.product._id;
    const id = req.params.id


    Warehouse.findOneAndUpdate({_id: id}, {$pull: { products : {_id: productId}}}).then(
        warehouse => {
            res.json(warehouse);  
        }
    ).catch(
        err => {
            res.json({ message: 'Error eliminando producto', err})
        }
    )
}    





export const addAllProductsToWarehouse = (req: Request, res: Response) => {

    const id = req.params.id;


    redisClient.get('products', (err, products) => {
        if(err) {
            res.json({ message: "Error consultando la cache"})
        }
        if (products) {
            var parsedProducts = JSON.parse(products)
            Warehouse.findOne({_id: id}, (err, warehouse) => {
                if(err) {
                    res.json({ message: "Error obteniendo los almacenes", err})
                }  
                else {
                    parsedProducts.forEach( product => {
                        warehouse.products.push(product);
                    })
                    warehouse.save( (err, warehouse) => {
                        if(err) {
                            res.json({ message: "Error agregando productos al almacen", err})
                        }
                        else {
                            res.json({ message: "Productos agregados con exito!", warehouse})
                        }
                    })
                }
            })
        }
        else {
            Products.find((err, products) => {
                if (err) {
                    console.log(err)
                    res.json({ message: 'error fetching products' })
                }
                else {
                    redisClient.set('products', JSON.stringify(products), (err, reply) => {
                        if(err) {
                            console.log(err)
                        } else {
                            console.log(reply, 'product saved in memory');
                        }
                        
                    })

                    Warehouse.findOne({_id: id}, (err, warehouse) => {
                        if(err) {
                            res.json({ message: "Error obteniendo los almacenes", err}) 
                        }  
                        else {
                            products.forEach( product => {
                                warehouse.products.push(product);
                            })
                            warehouse.save( (err, warehouse) => {
                                if(err) {
                                    res.json({ message: "Error agregando productos al almacen", err})
                                }
                                else {
                                    res.json({ message: "Productos agregados con exito!", warehouse})
                                }
                            })
                        }
                    })

                    
                   
                }
            })

        }
    })
    




}    







export const removeAllProducts = (req: Request, res: Response) => {
    const id = req.params.id


    Warehouse.findByIdAndUpdate({ _id: id}, {$set: {products: []}}).then(
        warehouse => {
           
            res.json({ message: "Productos borrados!", warehouse})
        }
    ).catch(
        err => {
            res.json({ message: "Error borrando todos los productos", err})
        }
    )

 

}

    








export const deleteWarehouse = (req: Request, res: Response) => {
    const id = req.params.id

    Warehouse.findByIdAndDelete({_id : id}).then(
        warehouse => {
            res.json({ message: 'Almacen eliminado!', warehouse, success: true});

        }

    ).catch(
        error => {
            res.json({ message: 'Error eliminando almacen', error, success: false});
        }
    )
    

}

    




export const updateWarehouse = (req: Request, res: Response) => {
    const id = req.params.id

    const updateData: any = {};

    if( req.body.warehouse_location !== undefined || null) {
        updateData.warehouse_location = req.body.warehouse_location;
    }
 if( req.body.warehouse_name !== undefined || null) {
        updateData.warehouse_name = req.body.warehouse_name;
    }
 if (req.body.total_stock !== undefined || null) {
        updateData.total_stock = req.body.total_stock;
    }
    
    console.log(updateData);


    Warehouse.findOneAndUpdate({ _id: id}, updateData, {new: true}, (err, warehouse) => {
        if(err) {
            res.json({ message: 'Error actualizando Almacen', success: false});

        } 
        else {
            res.json({ message: 'Almacen actualizado!', warehouse, success: true});
        }

    })
}





















