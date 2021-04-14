import { Schema, Document, model } from "mongoose";
import { ProductInterface, ProductSchema } from "../models/products-model";

export interface warehouseInterface extends Document{
    warehouse_location: string,
    warehouse_name: string,
    products: any[],
    total_stock: number
}


export const warehouseSchema: Schema = new Schema({
    warehouse_location: String,
    warehouse_name: String,
    products: {type: []},
    total_stock: Number
})

export default model<warehouseInterface>('Warehouse', warehouseSchema)

