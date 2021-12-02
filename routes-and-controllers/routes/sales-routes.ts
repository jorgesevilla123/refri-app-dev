import { Router } from 'express';
import { getAllSales, addSale, searchSalesByDate} from '../controllers/sales-controllers'; 





const router = Router();




router.route('/get-sales').get(getAllSales);






router.route('/add-sale').post(addSale);





router.route('/search-sales-by-date?').get(searchSalesByDate);









export default router;