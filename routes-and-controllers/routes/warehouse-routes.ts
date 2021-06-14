import { Router } from "express";
import { addWarehouse, getWarehouse, deleteWarehouse, searchWarehouse, updateWarehouse, removeProductFromWarehouse, removeAllProducts, addProductToWarehouse, addAllProductsToWarehouse, getOneWarehouse, searchWarehouseProducts, updateWarehouseProducts  } from "../controllers/warehouse-controllers";
import upload from "../../fileProcessing";

const router = Router();




router.route('/get-warehouses').get(getWarehouse);




router.route('/get-one-warehouse/:id').get(getOneWarehouse);




router.route('/search-warehouse?').get(searchWarehouse);



router.route('/search-products-warehouse/:id?').get(searchWarehouseProducts);




router.route('/add-warehouse').post(upload.none(), addWarehouse);





router.route('/add-product/:id').put(addProductToWarehouse);





router.route('/add-all-products/:id').put(addAllProductsToWarehouse);






router.route('/delete-warehouse/:id').delete(deleteWarehouse);







router.route('/delete-product/:id').delete(removeProductFromWarehouse);






router.route('/remove-all-products/:id').delete(removeAllProducts);













router.route('/update-warehouse/:id').put(upload.none(),updateWarehouse);





router.route('/update-warehouse-products/:warehouseId/:productId').get( updateWarehouseProducts)







export default router