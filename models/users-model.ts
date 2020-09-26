
import { Schema, model, Document } from 'mongoose';
import * as bcrypt from "bcryptjs";



export interface userInterface extends Document{
    email: string,
    password: string,
    nivel: string,
    hashPassword(password): any

}


export const userSchema = new Schema({
    email: String,
    password: String,
    nivel: String,
 

    
});





export default model<userInterface>('Users', userSchema);