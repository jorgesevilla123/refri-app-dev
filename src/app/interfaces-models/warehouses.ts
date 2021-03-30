import { Products } from "./products"

export interface Warehouse {
    warehouse_location: string,
    warehouse_name: string,
    products: Products[],
    total_stock: number
}