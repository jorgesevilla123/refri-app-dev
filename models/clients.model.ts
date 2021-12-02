import { Schema, model, Document, SchemaType, ObjectId, SchemaTypes } from "mongoose";


export interface shoppingBasketInterface extends Document {
    _id: string,
    title: string,
    modelo: string,
    precio: number,
    cantidad: number,
    fecha_de_compra: Date
}



export interface Client extends Document {
    name: string,
    cedula: number,
    email: string
    constantBuyer: boolean,
    productsBought_id: [ObjectId],
    cart: [shoppingBasketInterface],
    mostBought: shoppingBasketInterface,
    phoneNumber: number,
    lastPurchase: Date

}


const ProductSchema: Schema = new Schema({
    title: String,
    modelo: String,
    precio: Number,
    cantidad: Number,
    fecha_de_compra: Date

})

export const ClientSchema: Schema = new Schema({
    name: String,
    cedula: Number,
    email: String,
    constantBuyer: Boolean,
    productsBought: {type: [SchemaTypes.ObjectId]},
    cart: {type: [ProductSchema]},
    mostBought: ProductSchema,
    phoneNumber: Number,
    lastPurchase: {type: Date, default: Date.now}
})


export default model<Client>('Client', ClientSchema)



