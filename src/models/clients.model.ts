import { Schema, model, Document } from "mongoose";
import { shoppingBasketInterface, ProductSchema } from "./shopping-basket";



export interface Client extends Document {
    name: string,
    cedula: number,
    email: string
    constantBuyer: boolean,
    productsBought: [shoppingBasketInterface],
    mostBought: shoppingBasketInterface,
    phoneNumber: number,
    lastPurchase: Date

}

const ClientSchema: Schema = new Schema({
    name: String,
    cedula: Number,
    email: String,
    constantBuyer: Boolean,
    productsBought: {type: [ProductSchema], default: [{title: 'No ha comprado productos'}]},
    mostBought: ProductSchema,
    phoneNumber: Number,
    lastPurchase: {type: Date, default: Date.now}
})


export default model<Client>('Client', ClientSchema);
