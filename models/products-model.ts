import { Schema, model, Document } from 'mongoose';

export interface ProductInterface extends Document {
    title: string,
    modelo: string,
    precio: number,
    cantidad: number,
    imagePath: string,
    categorias: string[]
}


export const ProductSchema: Schema = new Schema({
    title: {type: String, index: true},
    modelo: {type: String, index: true},
    precio: Number,
    cantidad: Number,
    imagePath: String,
    categorias: Array
    
})


export default  model<ProductInterface>('Product', ProductSchema);