import { Products } from "../interfaces-models/products";

export interface Client {
    _id: string,
    name: string,
    cedula: number,
    email: string,
    constantBuyer: boolean,
    productsBought: [Products],
    cart: [Products],
    mostBought: Products,
    phoneNumber: string,
    lastPurchase: Date


}