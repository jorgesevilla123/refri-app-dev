import { Schema, model, Document } from "mongoose";
import { ProductInterface } from "./products-model"
import { ProductSchema } from "./products-model";




export interface Client extends Document {
    name: string,
    constantBuyer: boolean,
    productsBought: [ProductInterface],
    mostBought: ProductInterface,
    phoneNumber: string,
    lastPurchase: Date

}

const ClientSchema: Schema = new Schema({
    name: String,
    constantBuyer: Boolean,
    productsBought: [ProductSchema],
    mostBought: ProductSchema,
    phoneNumber: String,
    lastPurchase: {type: Date, default: Date.now}
})


export default model<Client>('Client', ClientSchema);
