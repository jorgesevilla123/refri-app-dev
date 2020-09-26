const util = require('util');
const crypto = require('crypto');
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import { userInterface } from "../models/users-model";


export const randomBytes = util.promisify(crypto.randomBytes);

export const signJwt = util.promisify(jwt.sign);



const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key', 'utf-8');



const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key', 'utf-8');

const SESSION_DURATION = 1000;




export async function createSessionToken(user: userInterface) {

    return signJwt({
        nivel: user.nivel
        

    }, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 240,
        subject: user._id.toString()
    }
    )
}

export async function decodeJwt(token: string) {
    const payload = await jwt.verify(token, RSA_PUBLIC_KEY);
    
    console.log('decoded JWT payload', payload);

    return payload

}


export async function createCsrfToken() {
    return await randomBytes(32).then(bytes => bytes.toString('hex'));

}