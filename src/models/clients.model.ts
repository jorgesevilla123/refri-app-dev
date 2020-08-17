import { Schema, model, Document } from "mongoose";


interface shoppingBasketInterface extends Document {
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
    productsBought: [shoppingBasketInterface],
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
