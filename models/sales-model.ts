import { Schema, model, Document, ObjectId, SchemaTypes} from "mongoose";
import { Client, ClientSchema } from './clients.model';
import { ProductInterface, ProductSchema } from './products-model';



export interface SalesInterface extends Document {
    productos: [ObjectId],
    cliente: ObjectId,
    tipo_de_venta: string,
    fecha: Date,
    total: number,
    divisa: string
}

const SalesSchema = new Schema<SalesInterface>({
    productos: [SchemaTypes.ObjectId],
    cliente: SchemaTypes.ObjectId,
    tipo_de_venta: String,
    fecha: Date,
    total: Number,
    divisa: String 
})


export default model<SalesInterface>('Sales', SalesSchema);

