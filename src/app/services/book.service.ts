import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/Book';
import { Bookstore } from '../interfaces/Bookstore';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = `${environment.apiUrl}/book`
  constructor(private httpClient: HttpClient) { }

  getBook(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.url)
  }

  getBookByStore(bookstore: Bookstore): Observable<Book[]>{
    
    return this.httpClient.post<Book[]>(this.url+"/store", bookstore)
  }

  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.url, book)
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(this.url, book)
  }

  deleteBook(id:number): Observable<Book>{
    return this.httpClient.delete<Book>(this.url+"/"+id)
  }
}
