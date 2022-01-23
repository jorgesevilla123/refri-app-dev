import { Request, Response } from "express";
import * as url from "url";
import * as querystring from 'querystring';
import Product, { ProductInterface } from "../../models/products-model";











export class testControllers {

    constructor(){}





    queryTest(req: Request, res: Response)
    {
        const query: any = req.query;
        console.log(query.rh);
        console.log(query);
        const queryString = url.parse(req.url, true).search;
        console.log(`this is the parsed querystring: ${queryString}`);
        res.send('Successfully loaded');
    }


    searchTest(req: Request, res: Response) {
        const q: any = req.query.q
        const page: any =  req.query.page
        const categoria = req.query.categoria 
        const product_title = new RegExp(`${q}`, 'gi')
        const product_model = req.query.model
        const category = categoria
        console.log(categoria)




        


        switch (category) {

            //executed if no category is specified
            case '[]':
                
        Product.aggregate([
            {
                '$match': { '$or': [{'title': product_title}, {'modelo': product_model}]}
            }
        ], (err, products) => {
            if (err) {
                res.json({message: 'error getting products'})
            } else {
                res.json({message: 'products fetched without category', products: products})         
            }
        })

            // executed if category is specified to render products by category 
                break;
         
            default:
        Product.aggregate([
            {
                '$match': { '$or': [{'title': product_title}, {'modelo': product_model}], '$and': [ {'categorias': category}]}
            }
        ], (err, products) => {
            if (err) {
                res.json({message: 'error getting products'})
            } else {
                res.json({message: 'products fetched with category', products: products})         
            }
        })
                break;
        }


   

        



    }











}