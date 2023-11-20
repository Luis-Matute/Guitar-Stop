import { Specification } from "./specification";

export interface Guitar {
    id: string,
    brand: string,
    type: string, // Acoustic / Electric
    condition: string, // Used / new
    price: number,
    imageUrl: string,
    name: string,
    specification: Specification
}
