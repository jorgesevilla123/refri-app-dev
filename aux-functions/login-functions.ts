import { Request, Response } from "express";



export const isLoggedIn = (req: any): boolean => {
    return !!req.session!.userId

}





export const logOut = (req: Request, res: Response) => {
    new Promise<void>((resolve, reject) => {
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