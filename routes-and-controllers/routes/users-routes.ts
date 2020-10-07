import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Users, { userInterface } from '../models/users-model'
import * as bcrypt from "bcryptjs";
import upload from "../fileProcessing";
import * as fs from "fs";
import { registerSchema } from "../validation/auth";
import { login } from "../aux-functions/login-functions";
import { guest } from "../middlewares/pre-register";




//Cache middleware

// function cache(req: Request, res: Response, next: NextFunction) {
//     const {username} = req.params;

//     redisConfig.redisCreateClient().get(username, (err, data) => {
//         if(err) {
//             console.log(err)

//         }
//         else if(data !== null){
//             res.json({username, data})

//         }
//         else {
//             next();
//         }
//     })

// }





const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key', 'utf-8');
const router = Router();






// router.route('/redis-sessions-test/:username').get(cache, async (req: Request, res: Response) => {

//     try {
//         console.log('Fetching data...')
        
//         const { username } = req.params 

        

//         const response = await fetch(`https://api.github.com/users/${username}`);

//         const data = await response.json();

//         const repos = data.public_repos

//         //setting data to redis

//         redisConfig.redisCreateClient().setex(username, 3600, repos)

//         res.send(`<b>${username} has ${repos} Github repos</b>`);


        
//     } catch (error) {
//         console.log(error);
        
//     }
    

// })





router.route('/getUsers').get((req: Request, res: Response) => {
    Users.find((err, users) => {
        if (err) {
            console.log(err)
        } else {
            res.json(users)
        }

    });
});


// Signup

router.route('/signup').post(guest, upload.none(), async (req: Request, res: Response) => {
    await registerSchema.validateAsync(req.body, {abortEarly: false});


    const { email, password } = req.body
    console.log(password);

    const found = await Users.exists({ email})

    if(found){
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

                            //Creating the session id
                            login(req, newUser._id)


                            // Saving the user with the hashed password
                            newUser.save((err, userAdded) => {
                                if (err) {
                                    console.log(err)
                                }
                                else {
                                    res.json({ userAdded, LOGGED_IN: true});
                                    console.log(res);
                                }
                            })
                        }
                    })
                })

        

    }

    })




router.route('/login').post(upload.none(), (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(email);
    Users.findOne({ email: email }, async (err, user) => {
        if (err) {
            console.log(err);
        }
        else if (!user) {
            return res.json({ NOT_FOUND: true });
        }

        else {


            //Comparing hashed password with password typed 
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.json({ WRONG_PASS: true });
            }
            else {

                try {

                    //Setting the session id
                    req.session.userId = user._id;
                    console.log(req.session.userId);




                    //this response is the login confirmation for validation in frontend
                    res.json({ LOGGED_IN: true });


                }
                catch (err) {
                    res.sendStatus(403);

                }


            }

        }

    })

})



export default router