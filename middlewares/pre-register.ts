import { Request, Response, NextFunction } from "express";
import { isLoggedIn } from "../aux-functions/login-functions";




export const guest = (req: Request, res: Response, next: NextFunction) => {
    if(isLoggedIn(req)) {
        console.log('you are already logged in');
        res.json({message: true})
        
    }
    else {
        next()
    }
        

}


export const auth = (req: Request, res: Response, next: NextFunction) => {
    if(!isLoggedIn(req)) {
        return res.json({errorMessage: "you must be logged in"})
    }
    else {
        next();
    }
    
} 