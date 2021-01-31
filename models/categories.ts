import { Schema, model, Document } from "mongoose";



export interface categoriesInterface extends Document {
    categorias: string
}



export const CategorySchema: Schema = new Schema({
    categorias: String
})

export default model<categoriesInterface>('Categories', CategorySchema);