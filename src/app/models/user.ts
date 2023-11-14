import { Cart } from "./cart";

export interface User {
    id: string,
    username: string,
    cart: Cart
}
