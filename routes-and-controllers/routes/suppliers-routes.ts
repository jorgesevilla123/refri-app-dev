import { Router, Request, Response } from 'express';
import { getSuppliers, addSupplier, deleteSupplier, searchSuppliers, updateSupplier, addSupplierNumber, deleteSupplierNumber, updateSupplierLocation} from '../controllers/suppliers-controller'

const router = Router();








router.route('/get-suppliers').get(getSuppliers)






router.route('/add-supplier').post(addSupplier)






router.route('/delete-supplier/:id').delete(deleteSupplier)






router.route('/search-suppliers?').get(searchSuppliers);





router.route('/update-supplier/:id').put(updateSupplier);





router.route('/update-supplier-location/:id').put(updateSupplierLocation);




router.route('/add-supplier-number/:id?').put(addSupplierNumber)





router.route('/remove-supplier-number/:id?').put(deleteSupplierNumber)




export default router;
