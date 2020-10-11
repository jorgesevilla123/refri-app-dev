import { Request, Response, NextFunction } from "express"
import { registerSchema, loginSchema } from "../../validation/auth";
import { guest } from "../../middlewares/pre-register";
import Users, { userInterface } from '../../models/users-model'
import * as bcrypt from "bcryptjs";
import * as fs from "fs";



export const register = async (req: Request, res: Response, next: NextFunction) => {
    await registerSchema.validateAsync(req.body, { abortEarly: false });
    const { email, password } = req.body

    const found = await Users.exists({ email })

    if (found) {
        res.json({ ALREADY_IN: true })
    }

    else {

        //creating the new user with the hashed password
        const newUser = new Users({ email, password });

        // Hashing the password using bcrypt function
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    console.log(err);
                }
                else {
                    newUser.password = hash
                    console.log(newUser._id);
                    req.session.userId = newUser._id
                    console.log(req.session.userId);

                    



                    // req.session.userId = newUser._id
      
                    // Saving the user with the hashed password
                    newUser.save((err, userAdded) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.json({ userAdded, LOGGED_IN: true });
                          
                        }
                    })
                }
            })
        })
    }
}





export const getLogin = async (req: Request, res: Response, next: NextFunction) => {
    await loginSchema.validateAsync(req.body, { abortEarly: false });

    const { email, password } = req.body

    const user = await Users.findOne({ email })

    if (!user || !(await user.matchesPassword(password))) {
        res.json({ NO_MATCH: true })
    }

    else {
        req.session.userId = user._id;
        res.json({LOG_IN: true})
    }
}




export const getLogout = async (req: Request, res: Response, next: NextFunction) => {
    new Promise((resolve, reject) => {
        req.session!.destroy((err) => {
            if(err) {
                reject(err);
            }
            else {
                res.clearCookie('redis_practice').send({ message: 'logged out'}) //Add corresponding name argument
                resolve();
            }
        })
    })

   


}