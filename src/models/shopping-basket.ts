import { Schema, model, Document } from 'mongoose';

export interface shoppingBasketInterface extends Document {
    title: string,
    modelo: string,
    precio: number,
    cantidad: number,
    fecha_de_compra: Date
}


export const ProductSchema: Schema = new Schema({
    title: {type: String, index: true},
    modelo: {type: String, index: true},
    precio: Number,
    cantidad: Number,
    fecha_de_compra: Date 
})


export default  model<shoppingBasketInterface>('shoppingBasket', ProductSchema);