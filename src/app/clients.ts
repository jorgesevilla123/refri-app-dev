import { Products } from "./products";

export interface Client {
    _id: string,
    name: string,
    cedula: number,
    email: string,
    constantBuyer: boolean,
    productsBought: [Products],
    mostBought: Products,
    phoneNumber: string,
    lastPurchase: Date


}