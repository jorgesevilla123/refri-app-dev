import { Products } from "./products"

export interface Warehouse {
    _id: string,
    warehouse_location: string,
    warehouse_name: string,
    products: Products[],
    total_stock: number
}