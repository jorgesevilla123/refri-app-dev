import { Router } from 'express';
import { Request, Response} from 'express';
import CurrencyChange from "../models/currency-change-model";
import upload from "../fileProcessing";


const router = Router();


router.route('/checkCurrency').get( (req: Request, res: Response) => {
    res.json({message: 'Currency route working good'})

})

router.route('/currency-change').get( (req: Request, res: Response)  => {
    CurrencyChange.find( (err, currencyData) => {
        if(err) {
            console.log(err)
            res.json( { message: 'Error retrieveng data' } )
        }
        else {
            res.json(currencyData)
            console.log(currencyData)
        }
    }).sort({'date': -1});
})


router.route('/currency-change/most-recent').get( (req: Request, res: Response)  => {
    CurrencyChange.findOne( (err, currencyData) => {
        if(err) {
            console.log(err)
            res.json( { message: 'Error retrieveng data' } )
        }
        else {
            res.json(currencyData)
            console.log(currencyData)
        }
    }).sort({'date': -1});
})


router.route('/currency-change/addPrice').post(upload.none(), async (req: Request, res: Response)  => {
    const {precio} = req.body;
    const newPrecio = new CurrencyChange({ precio });
    await newPrecio.save();
    res.json(newPrecio);
})








export default router;


