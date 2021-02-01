import { Request, Response, NextFunction } from "express"
import { validation } from "../../validation/auth";
import Users, { userInterface } from '../../models/users-model'
import * as bcrypt from "bcryptjs";










export const getUsers = (req: Request, res: Response) => {
    res.json({message: 'You got it'})
}



export const checkSession = (req: any, res: Response) => {
    try {
        if(!!req.session.userId){
            return res.json({LOGGED_IN: true});
        }
        else {
           return res.json({LOGGED_IN: false})
        }
        
    } catch (error) {
        console.log(error)
    }
}









export const checkObservable = (req: Request, res: Response) => {
    
}







export const register = async (req: any, res: Response, next: NextFunction) => {
        const { email, password, passwordConfirm } = req.body

        const found = await Users.exists({ email });

        if(found){
            console.log('Ya existe una cuenta con este correo');
             res.json({ALREADY_IN: true})
             return 
        }

        else {

            
        if(validation.validateEmail(email)){
            console.log('valid email');
        
        } else {
            console.log('This email is not valid');
            res.json({INVALID_EMAIL: true})
            return     
        }

        if(validation.minPassword(password)){
            console.log('contrasena valida')

        } else {
            console.log('La contraseña debe tener como minimo 8 caracteres');
            res.json({MIN_LENGTH: true});
            return
        }

        if(validation.passwordMatches(password, passwordConfirm)){

            
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




                        req.session.userId = newUser._id

                        // Saving the user with the hashed password
                        newUser.save((err, userAdded) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.json({ userAdded, LOGGED_IN: true });
                                console.log('registrado correctamente');

                            }
                        })
                    }
                })
            })
          
        }
        else {
            console.log('Las contrasenas no coinciden');
            res.json({NO_MATCH: true})
            return
        }

        }
}





export const getLogin = async (req: any, res: Response, next: NextFunction) => {
    // await loginSchema.validateAsync(req.body, { abortEarly: false });

    const { email, password } = req.body

    const user = await Users.findOne({ email });

    const found = await Users.exists({ email });

    if(!found){
        res.json({NOT_FOUND: true})
    }

    else {
        
    if (!user || !(await user.matchesPassword(password))) {
        res.json({ NO_MATCH: true })
    }

    else {
        req.session.userId = user._id;
        res.json({ LOG_IN: true })
    }

    }

}






// export const checkLogin = (req: Request, res: Response) => {

//     function checkIfKey(): boolean {
//         return redisClient.keys("sess:*", (err, key: any)  => {
//             if(err) {
               

//             } else {
    
//                 redisClient.get(key, async (err, keyValue) => {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         let keyValueObj = JSON.parse(keyValue);
//                         if (!!keyValueObj.userId) {
//                             console.log('No error finding the key');
//                             return true
//                         //  return res.json({ CHECK_IN: true });
    
//                         }
//                         else {
//                             console.log('No error not finding the key');
//                             return false
//                             // return res.json({ CHECK_IN: false });
//                         }
//                     }
//                 })
//                 }
//             })
//     }

//     if(checkIfKey()){
//         console.log('found key')
//     }
//     else {
//         console.log('key not found');
//     }




    
//     }










export const getLogout = async (req: Request, res: Response, next: NextFunction) => {
    new Promise<void>((resolve, reject) => {
        req.session!.destroy((err) => {
            if (err) {
                reject(err);
            }
            else {
                res.clearCookie('redis_practice').send({LOGGED_OUT: true}) //Add corresponding name argument
                resolve();
            }
        })
    })




}