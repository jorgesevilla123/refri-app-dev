import { register, getLogin, getLogout, checkSession, checkObservable, getUsers} from "../controllers/users-controllers"
import { Router } from "express";
import upload from "../../fileProcessing";
import { logOut } from "../../aux-functions/login-functions";
import { auth, guest } from "../../middlewares/pre-register"



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





// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key', 'utf-8');
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




// This route retrieves all users, only for admin operations
router.route('/getUsers').get(getUsers);


// Users register, for more info look for users-controllers file
router.route('/signup').post( upload.none(), register);



//Users login, for more info look for users-controllers file
router.route('/login').post( upload.none(), getLogin);



router.route('/check-session').post(checkSession);





////Users logout, for more info look for users-controllers file
router.route('/logout').post(auth, getLogout);





export default router