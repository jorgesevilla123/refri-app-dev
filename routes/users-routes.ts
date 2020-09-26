import { Router } from "express";
import { Request, Response } from "express";
import Users, { userInterface } from '../models/users-model'
import * as jwt from "jsonwebtoken";
import { createCsrfToken, createSessionToken } from "../security-config/security-util";
import * as bcrypt from "bcryptjs";
import upload from "../fileProcessing";




const router = Router();

//Function for creating an user and a session 




router.route('/checkUsers').get( (req: Request, res: Response) => {
    res.json({ message: 'route working good'})
})




22
router.route('/getUsers').get( (req: Request, res: Response) => {
    Users.find( (err, users) => {
        if(err) {
            console.log(err)
        } else {
            res.json(users)
        }

    });
});


// Signup

router.route('/signup').post(upload.none(), (req: Request, res: Response) => {
    const {email, password, confirmPassword} = req.body
    console.log(password, confirmPassword);
    Users.findOne({email: email}, async (err, user) => {
     
    
            if(user === null) {

            if(password !== confirmPassword) {
                res.json({NO_MATCH: true})
            }

            else {

                
            //creating the new user with the hashed password

            const newUser = new Users({email, password})

            // Hashing the password using bcrypt function


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        newUser.password = hash
                        
           //Creating session token with jwt.sign. Read the security.utils folder for more info about the function

            const sessionToken = await createSessionToken(newUser);


            // Creatin the cross-site request forgery token


            const csrfToken = await createCsrfToken();

            
            //Creating our session cookie with the cookie name, value and the options

            res.cookie("SESSIONID", sessionToken, {httpOnly: true, secure: true});


            //Creating the cross-site request 
            
            res.cookie("XSRF", csrfToken);
                      
            
            // Saving the user with the hashed password


                        newUser.save( (err, userAdded) => {
                            if(err) {
                                console.log(err)
                            }
                            else {
                                res.json(userAdded);
                            } 
                        })
                            }
                        })
                    })



            }





            //Server side validation for existing emails
        }
        else if (user.email === email) {
            res.json({ALREADY_IN: true})
        }

      

        
    })

});




router.route('/signin').post( (req: Request, res: Response) => {
    const { email, password} = req.body
    Users.findOne({email: email}, (err, user) => {
        if(!user) {
            return res.json({ message: 'Este correo electronico no esta registrado'})
        }
        else if (user.password !== password) {
            return res.json({ message: 'Contraseña incorrecta'})
        } 
        else {
            const token = jwt.sign({_id: user._id}, 'secretKey')
            res.json(token);
        }
        
    })

})



export default router