import { Request, Response, NextFunction} from 'express' 


export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Not found" })
}


export const internalServerError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({message: 'Internal server error'})
} 