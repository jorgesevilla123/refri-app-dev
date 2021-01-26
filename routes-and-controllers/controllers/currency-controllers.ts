import { Request, Response} from 'express';
import CurrencyChange from "../../models/currency-change-model";
import upload from "../../fileProcessing";




export const currencyRouteTest = (req: Request, res: Response) => {
    res.json({message: 'Currency route working good'})
}






export const getAllCurrencies = (req: Request, res: Response) => {
    CurrencyChange.find( (err, currencyData) => {
        if(err) {
            console.log(err)
            res.json( { message: 'Error retrieveng data' } )
        }
        else {
            res.json(currencyData)
        }
    }).sort({'date': -1});
}






export const getMostRecentCurrency = (req: Request, res: Response) => {
    CurrencyChange.findOne( (err, currencyData) => {
        if(err) {
            console.log(err)
            res.json( { message: 'Error retrieveng data' } )
        }
        else {
            res.json(currencyData)
        }
    }).sort({'date': -1});

}






export const addPrice = async (req: Request, res: Response) => {
    const {precio} = req.body;
    const newPrecio = new CurrencyChange({ precio });
    await newPrecio.save();
    res.json(newPrecio);
}
