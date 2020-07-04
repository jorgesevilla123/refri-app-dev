import { Products } from "./products";

export interface Client {
    name: string,
    constantBuyer: boolean,
    productsBought: [Products],
    mostBought: Products,
    phoneNumber: string,
    lastPurchase: Date


}