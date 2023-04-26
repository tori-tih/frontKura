import { Bookstore } from "./Bookstore";

export interface JointProduct {
    id: number;
    barecode: string;
    count: number;
    price: number;
    image: string;

    nameProduct: string;

    bookstore: Bookstore;
}