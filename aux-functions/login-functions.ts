import { Request, Response } from "express";



export const isLoggedIn = (req: Request): boolean => {
    return !!req.session!.userId

}





export const logOut = (req: Request, res: Response) => {
    new Promise((resolve, reject) => {
        req.session!.destroy((err) => {
            if(err) {
                reject(err)
            }
            else {
                res.clearCookie('name') //Add corresponding name argument
                resolve()
            }
        })
    })
}