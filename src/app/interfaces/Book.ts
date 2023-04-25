import { Author } from "./Author";


export interface Book {
    id: number;
    barecode: string;
    count: number;
    price: number;
    image: string;

    nameBook: string;
    yearPublic: number;
    authors: Author[];
}