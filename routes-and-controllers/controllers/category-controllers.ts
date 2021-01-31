import {Request, Response} from 'express';
import  Categories, {categoriesInterface} from '../../models/categories';




export const createCategory = (req: Request, res: Response) => {
    console.log(req.body);

}


export const getCategories = (req: Request, res: Response) => {
    Categories.find( (err, categorias) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(categorias);
        }
    })
}



