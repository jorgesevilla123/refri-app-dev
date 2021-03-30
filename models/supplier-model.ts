import {Schema, Document, model} from 'mongoose'

export interface Location extends Document{
    address: string,
    city: string,
    state: string,
    postal_code: number,
    country: string,
    region: string

}


const LocationSchema: Schema = new Schema({
    address: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
    region: String
});








export interface suppliersInterface extends Document {
    company_name: string,
    contact_name: string,
    contact_email: String,
    rif: String,
    location: Location,
    contact_phones: number[]
}


const SupplierSchema: Schema = new Schema({
    company_name: String,
    contact_name: String,
    contact_email: String,
    rif: String,
    location: LocationSchema,
    contact_phones: {type: [Number], default: 'Sin numero de contacto'}
})


export default model<suppliersInterface>('Suppliers', SupplierSchema)