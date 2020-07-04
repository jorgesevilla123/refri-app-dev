import { Schema, model, Document } from "mongoose";



export interface CurrencyChange extends Document{
    precio: number
    date: Date
}



const CurrencyChangeSchema: Schema = new Schema({
    precio:  Number,
    date: {type: Date, default: Date.now}

})


export default model<CurrencyChange>('CurrencyChange', CurrencyChangeSchema);
