import { Router } from 'express';
import { Request, Response} from 'express';
import upload from "../../fileProcessing";
import { addProduct, deleteOneProduct, getAllProducts, getOneProduct, 
    justForTest, 
    searchProducts, updateOneProduct, updateProductImage
 } from "../controllers/products-controllers";

const router = Router();




//This route is only for testing that the routing to api is working good
router.route('/checkProducts').get(justForTest);




//Route for getting all products
router.route('/').get(getAllProducts);




//Route for searching products
router.route('/search?').get(searchProducts);




//Route for getting one product
router.route('/:id').get(getOneProduct);





//Route for adding a product
router.route('/').post(upload.single('imagePath'), addProduct);





//Route for deleting selected product
router.route('/delete-product/:id').delete(deleteOneProduct);




//Route for updating a product
router.route('/update/:id').put(upload.none(), updateOneProduct)




//Route for updating a product image
router.route('/update-photo/:id').put(upload.single('newImage'), updateProductImage)






export default router;


