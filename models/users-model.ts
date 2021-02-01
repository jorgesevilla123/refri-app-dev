
import { Schema, model, Document } from 'mongoose';
import bcryptjs from "bcryptjs";






export interface userInterface extends Document{
    email: string,
    password: string,
    nivel: string,
    matchesPassword(password: string): Promise<boolean>

}


export const userSchema = new Schema({
    email: String,
    password: String,
    nivel: String,
 

    
});



const userModel = model('Users', userSchema)


const doc = new userModel();




userSchema.methods.matchesPassword = function(password: string) {
    return bcryptjs.compare(password, this.password);
    
}





export default model<userInterface>('Users', userSchema);