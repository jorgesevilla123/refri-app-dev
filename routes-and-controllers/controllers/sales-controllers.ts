import {Request, Response} from 'express';
import { date } from 'joi';
import Sales, { SalesInterface } from "../../models/sales-model";


export const getAllSales = (req: Request, res: Response) => {
    
    Sales.find( (err, sales) => {
        if(err) {
            res.json({ message: 'Error getting sales', err})
        }
        else {
            res.json({ message: 'Products retrieved', sales })
            console.log(sales);
        }
    })


}




export const addSale = (req: Request, res: Response) => {
    let {productos, cliente, tipo_de_venta, fecha, total, divisa} = req.body
    
    fecha = Date.now()

    console.log(`Hoy el cliente ${cliente.name} ha comprado ${productos},  por el ${tipo_de_venta} el dia ${fecha}, el monto total fue ${total}. El pago fue hecho en ${divisa}`)
    
    const transaction = new Sales({productos, cliente, tipo_de_venta, fecha, total, divisa});

    transaction.save( (err, sale) => {
        if(err){
            res.json({ meesage: 'Error al realizar venta', err});
        }
        else {
            res.json({ message: 'Venta realizada con exito', sale})
        }
    })

    
    
    


}



export const searchSalesByDate = (req: Request, res: Response) => {
    Sales.find( (err, sales) => {
        if(err) {
            res.json({ message: 'error encontrando ventas', sales })
        }
        else {
            res.json({ message: 'Ventas encontradas', sales })
        }
    })
    res.json({ message: 'Sales search route working good', date});


}