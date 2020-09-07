import { Router } from 'express';
import { Request, Response} from 'express';
import Product, { ProductInterface } from "../models/products-model";

const router = Router();


router.route('/checkProducts').get( (req: Request, res: Response) => {
    res.json({message: 'Product route working good'})

})


router.route('/products').get( (req: Request, res: Response) => {
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


router.route('/products/search?').get( (req: Request, res: Response) => {
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


router.route('/products/:id').get( (req: Request, res: Response)  => {
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

router.route('/products').post( async (req: Request, res: Response)  => {
    const {title, modelo, precio, cantidad} = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newProduct = new Product({title, modelo, cantidad, precio, imagePath})
    await newProduct.save();
    console.log('Product saved')
    res.sendStatus(200)
})


router.route('/products/delete-product/:id').delete( async (req: Request, res: Response)  => {
    const id = req.params.id
    Product.findByIdAndRemove({_id: id}, (err, product) => {
        if(err){
            console.log(err)
            res.json({ message: 'Error deleting product' })
        }
        else {
            res.json(product);
        }
    })
   
})



router.route('/products/update/:id').put( (req: Request, res: Response)  => {
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

router.route('/products/update-photo/:id').put( (req: Request, res: Response)  => {
    const id = req.params.id
    const imagePath = '/uploads/' +  req.file.filename;
    Product.findOneAndUpdate({ _id: id }, {imagePath: imagePath}, { upsert: false }, (err, doc) => {
        if (err) {
            res.sendStatus(500)
        } else
            doc.save();
        res.sendStatus(200)

    });
})
















export default router;


