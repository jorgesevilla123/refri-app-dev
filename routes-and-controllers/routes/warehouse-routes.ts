import { Router } from "express";
import { addWarehouse, getWarehouse, deleteWarehouse, searchWarehouse, updateWarehouse, removeProductFromWarehouse, removeAllProducts, addProductToWarehouse, addAllProductsToWarehouse  } from "../controllers/warehouse-controllers";


const router = Router();




router.route('/get-warehouses').get(getWarehouse)



router.route('/search-warehouse?').get(searchWarehouse);




router.route('/add-warehouse').post(addWarehouse);





router.route('/add-product/:id').put(addProductToWarehouse);





router.route('/add-all-products/:id').put(addAllProductsToWarehouse);






router.route('/delete-warehouse/:id').delete(deleteWarehouse);







router.route('/delete-product/:id').delete(removeProductFromWarehouse);






router.route('/remove-all-products/:id').delete(removeAllProducts);







router.route('/update-warehouse/:id').put(updateWarehouse);







export default router