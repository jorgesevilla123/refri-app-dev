
import { Request, Response } from 'express';
import Product, { ProductInterface } from "../../models/products-model";
import * as fs from "fs-extra";
import { filter } from 'rxjs/operators';


function paginate(
    totalItems: number,
    currentPage: any ,
    pageSize: number    ,
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
    let startIndex= (currentPage - 1) * pageSize;
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










export const justForTest = (req: Request, res: Response) => {
    res.json({ message: 'Product route working good' });
}






export const getAllProducts = (req: Request, res: Response) => {
    Product.find((err, products) => {
        if (err) {
            console.log(err)
            res.json({ message: 'error fetching products' })
        }
        else {
            res.json(products);
        }
    })
}


export const getOutOfStockProducts = (req: Request, res: Response) => {
    Product.find({ cantidad: 0  }, (err, products) => {
        if (err) {
            console.log(err);
            res.json({ ERROR_MESSAGE: 'error finding out of stock products' })
        }
        else {  
            res.json(products);
        }
    })
}




export const getLowStockProducts = (req: Request, res: Response) => {
    Product.find({ cantidad: { $lte: 5}}, (err, products) => {
        if(err) {
            console.log(err)
        } else {
            res.json(products);
        }
    })
}






export const searchProducts = (req: Request, res: Response) => {
    let itemsPerPage = 40;


    let product = req.query.q
    let page: any = req.query.page
    Product.find({ $or: [{ title: new RegExp(`${product}`, 'gi') }, { modelo: new RegExp(`${product}`, 'gi') }] })
    .exec((err, foundProducts) => {
        Product.countDocuments((err, count) => {
            if(err) {
                console.log(err)
            }

            else {

                
                let pageToInt = parseInt(page);
                const pager = paginate(foundProducts.length, pageToInt, itemsPerPage);
        

                    const pageOfItems = foundProducts.slice(pager.startIndex, pager.endIndex + 1);


                    res.json({products: foundProducts, current: page, pages: Math.ceil(foundProducts.length / itemsPerPage), count: count, pageOfItems, pager})

               
            }
        })
        
    })

}






export const filterCategories = (req: Request, res: Response) => {
    let itemsPerPage = 40;
    let category = req.query.category;
    let pageQuery: any = req.query.page;
    let page = parseInt(pageQuery);
    Product.find({ categorias: new RegExp(`${category}`, 'gi')}).exec(
        (err, filteredProducts) => {
            Product.countDocuments( (err, count) => {
                if(err) {
                    console.log(err) 
                }
                else {

                    const pager = paginate(filteredProducts.length, page, itemsPerPage)

                    const pageOfItems = filteredProducts.slice(pager.startIndex, pager.endIndex + 1);

                    res.json({products: filteredProducts, current: page, pages: Math.ceil(filteredProducts.length / itemsPerPage), count: count, pageOfItems, pager})


                }

            })

        })
    
}




export const paginateProducts = (req: Request, res: Response) => {
    let itemsPerPage = 40;
    
   
    let page: any = req.query.page
    let pageToInt = parseInt(page);
   


    Product.find({}).skip((itemsPerPage * page) - itemsPerPage).limit(itemsPerPage)
    .exec((err, paginatedProducts) => {
        Product.countDocuments( (err, count) => {
            if(err) {
                console.log(err)
                
            } else {
                const pageSize = 40;

                const pager = paginate(count, pageToInt, pageSize);
                Product.find( (err, products) => { 
                   const pageOfItems = products.slice(pager.startIndex, pager.endIndex + 1);


                   res.json({products: paginatedProducts, current: page, pages: Math.ceil(count / itemsPerPage), count: count, pageOfItems, pager})

                });

            

        
             
            }
        })
        if (err) {
            console.log('Error executing products pagination', err)
        }
    })
  
}






export const getOneProduct = (req: Request, res: Response) => {
    const id = req.params.id
    Product.findById({ _id: id }, (err, product) => {
        if (err) {
            console.log(err)
            res.json({ message: 'Error fetching Product' })
        }
        else {
            res.json(product);
        }
    })
}






export const addProduct = (req: Request, res: Response) => {
    const { title, modelo, precio, cantidad } = req.body;

    let imagePath
    if (req.file == undefined) {
        imagePath = 'no-photo'
    }
    else {
        imagePath = `/${req.file.destination}/${req.file.filename}`
    }
    const newProduct = new Product({ title, modelo, cantidad, precio, imagePath })
    newProduct.save((err, product) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(product)
            console.log('Product saved!');
        }

    });
}





// export const deleteOneProduct = (req: Request, res: Response) => {
//     const id = req.params.id
//     Product.findOneAndRemove({ _id: id }, (err, product) => {
//         if (err) {
//             console.log(err)
//             res.json({ message: 'Error deleting product' })
//         }
//         else {
//             if (product.imagePath == 'no-photo') {
//                 res.json(product);

//             } else {


//                  fs.unlink(`C:/Users/jsdel/refridata${product.imagePath}`)
//                 res.json(product);
//                 console.log('Product deleted!');
//             }
//         }
//     })


// }





export const deleteOneProduct = (req: Request, res: Response) => {
    const id = req.params.id
    Product.findOneAndRemove({ _id: id }).then(
        product => {
            if (product.imagePath == 'no-photo') {
                res.json(product);

            } else {


                 fs.unlink(`C:/Users/jsdel/refridata${product.imagePath}`)
                res.json(product);
                console.log('Product deleted!');
            }

        }
    ).catch(
        err => {
            console.log(err)
            res.json({ message: 'Error deleting product' })
        }
    )
}







export const updateOneProduct = (req: Request, res: Response) => {
    const id = req.params.id
    const { title, modelo, precio, cantidad, categoria } = req.body
    Product.findByIdAndUpdate({ _id: id }, { title: title, modelo: modelo, precio: precio, cantidad: cantidad, $push: {categorias: categoria}}, { upsert: false },  (err, product) => {
        if (err) {
            console.log(err)
            res.json({ message: 'Error updating product' })
        }
        else {
            console.log(product);
            res.json(product);
        }
    })
}






export const updateProductImage = (req: Request, res: Response) => {
    const id = req.params.id
    const imagePath = `/${req.file.destination}/${req.file.filename}`
    Product.findOneAndUpdate({ _id: id }, { imagePath: imagePath }, { upsert: false }, (err, doc) => {
        if (err) {
            res.sendStatus(500)
        } else
            doc.save();
        res.json(doc);

    });
}