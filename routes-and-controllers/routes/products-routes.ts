import { Router } from 'express';
import { Request, Response} from 'express';
import Product, { ProductInterface } from "../../models/products-model";
import upload from "../../fileProcessing";
import * as fs from "fs-extra";
import * as path from "path";

const router = Router();


router.route('/checkProducts').get( (req: Request, res: Response) => {
    res.json({ message: 'Product route working good' })

})





router.route('/').get( (req: Request, res: Response) => {
    Product.find( (err, products) =>{
        if(err){
            console.log(err)
            res.json({ message: 'error fetching products'})
        }
        else {
            res.json(products);
        }
    })
})


router.route('/search?').get( (req: Request, res: Response) => {
    let product = req.query.title
    Product.find({ $or: [{title: new RegExp(`${product}`, 'gi')}, {modelo: new RegExp(`${product}`, 'gi')}]}, (err, product) => {
        if(err) {
            console.log(err);
            res.json({message: 'Error making search'})
        }
        else {
            res.json(product)
        }
    })
})


router.route('/:id').get( (req: Request, res: Response)  => {
    const id = req.params.id
    Product.findById({_id: id}, (err, product) => {
        if(err){
            console.log(err)
            res.json({ message: 'Error fetching Product' })
        }
        else {
            res.json(product);
        }
    })
})




router.route('/').post(upload.single('imagePath'), (req: Request, res: Response)  => {
    const {title, modelo, precio, cantidad} = req.body;
    
    let imagePath
    if(req.file == undefined){
        imagePath = 'no-photo'
    }
    else {
        imagePath = `/${req.file.destination}/${req.file.filename}`
    }
    const newProduct = new Product({title, modelo, cantidad, precio, imagePath})
    newProduct.save( (err, product) => {
        if(err) {
            console.log(err)
        }
        else {
            res.json(product)
            console.log('Product saved!');
        }

    });
 
 
})


router.route('/delete-product/:id').delete((req: Request, res: Response)  => {
    const id = req.params.id
    Product.findByIdAndRemove({_id: id}, async (err, product) => {
        if(err){
            console.log(err)
            res.json({ message: 'Error deleting product' })
        }
        else {
            if(product.imagePath == 'no-photo'){
                res.json(product);
            
            } else {

            
            await fs.unlink(`C:/Users/jsdel/refridata${product.imagePath}`)
            res.json(product);
            console.log('Product deleted!');
            }
        }
    })
   
})



router.route('/update/:id').put(upload.none(), (req: Request, res: Response)  => {
    const id = req.params.id
    const { title, modelo, precio, cantidad } = req.body
    Product.findByIdAndUpdate({_id: id}, { title: title, modelo: modelo, precio: precio, cantidad: cantidad}, { upsert: false }, (err, product) => {
        if(err){
            console.log(err)
            res.json({ message: 'Error updating product' })
        }
        else {
            res.json(product);
        }
    })
})

router.route('/update-photo/:id').put(upload.single('newImage'), (req: Request, res: Response)  => {
    const id = req.params.id
    const imagePath = `/${req.file.destination}/${req.file.filename}`
    Product.findOneAndUpdate({ _id: id }, {imagePath: imagePath}, { upsert: false }, (err, doc) => {
        if (err) {
            res.sendStatus(500)
        } else
            doc.save();
        res.json(doc);

    });
})
















export default router;


