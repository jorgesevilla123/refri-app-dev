import { Schema, model, Document, ObjectId, SchemaTypes } from 'mongoose';

export interface ProductInterface extends Document {
    title: string,
    modelo: string,
    precio: number,
    cantidad: number,
    imagePath: string,
    categorias: string
    warehouse_id: [ObjectId]
    
}


export const ProductSchema: Schema = new Schema({
    title: {type: String, index: true},
    modelo: {type: String, index: true},
    precio: Number,
    cantidad: Number,
    imagePath: String,
    categorias: String,
    warehouse_id:  [SchemaTypes.ObjectId]

})


export default  model<ProductInterface>('Product', ProductSchema);