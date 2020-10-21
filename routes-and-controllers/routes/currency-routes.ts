import { Router } from 'express';
import { Request, Response} from 'express';
import CurrencyChange from "../../models/currency-change-model";
import upload from "../../fileProcessing";
import { addPrice, currencyRouteTest, getAllCurrencies, getMostRecentCurrency } from 'routes-and-controllers/controllers/currency-controllers';


const router = Router();


router.route('/checkCurrency').get(currencyRouteTest);

router.route('/').get(getAllCurrencies);


router.route('/most-recent').get(getMostRecentCurrency);


router.route('/addPrice').post(upload.none(), addPrice);








export default router;


