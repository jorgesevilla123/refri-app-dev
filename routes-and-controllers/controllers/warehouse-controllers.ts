import { Request, Response } from "express";
import Warehouse, { warehouseInterface } from "../../models/warehouse-model";
import Products, { ProductInterface } from "../../models/products-model";
import { redisClient } from "./products-controllers";







export const getWarehouse = (req: Request, res: Response) => {

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


export const addWarehouse = (req: Request, res: Response) => {

    const {warehouse_location, warehouse_name, total_stock} = req.body

            const newWarehouse = new Warehouse({warehouse_location, warehouse_name, total_stock})
            newWarehouse.save( (err, warehouse) => {
                if(err) {
                    res.json({message: 'Error guardando almacen'});
                }
                else {
                res.json({message: 'Almacen guardado!', warehouse});
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


    Warehouse.findOneAndUpdate({_id: id}, {$pull: { products : {_id: productId}}}, (err, warehouse) => {
        if(err) {
            res.json({ message: 'Error eliminando producto', err})
        }
        else {
            res.json(warehouse);
        }
    })
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


    Warehouse.findByIdAndUpdate({ _id: id}, {$set: {products: []}}, (err, warehouse) => {
        if(err) {
            res.json({ message: "Error borrando todos los productos", warehouse})
        } 
        else {
            res.json({ message: "Productos borrados!", warehouse})
        }
    })

 

}

    








export const deleteWarehouse = (req: Request, res: Response) => {
    const id = req.params.id

    Warehouse.findByIdAndDelete({_id : id}).then(
        warehouse => {
            res.json({ message: 'Almacen eliminado!'});

        }

    ).catch(
        error => {
            res.json({ message: 'Error eliminando almacen'});
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
            res.json({ message: 'Error actualizando Almacen'});

        } 
        else {
            res.json({ message: 'Almacen actualizado!', warehouse});
        }

    })
}





















