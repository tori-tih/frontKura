import { Author } from "./Author";
import { Bookstore } from "./Bookstore";


export interface Book {
    id: number;
    barecode: string;
    count: number;
    price: number;
    image: string;

    nameBook: string;
    yearPublic: number;
    authors: Author[];

    bookstore: Bookstore;
}