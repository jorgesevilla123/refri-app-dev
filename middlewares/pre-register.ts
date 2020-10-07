import { Request, Response, NextFunction } from "express";
import { isLoggedIn } from "../aux-functions/login-functions";




export const guest = (req: Request, res: Response, next: NextFunction) => {
    if(isLoggedIn(req)) {
        return next(Error('You are already logged in'))
    }

    next()
}