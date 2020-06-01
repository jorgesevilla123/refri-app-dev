import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    title: String,
    modelo: String,
    precio: Number,
    cantidad: Number,
    imagePath: String
    
})


export default  model('Product', ProductSchema);