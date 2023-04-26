import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookstore } from '../interfaces/Bookstore';

@Injectable({
  providedIn: 'root'
})
export class BookstoreService {
  url = `${environment.apiUrl}/bookstore`
  constructor(private httpClient: HttpClient) { }

  getBookstore(): Observable<Bookstore[]> {
    return this.httpClient.get<Bookstore[]>(this.url)
  }

  addBookstore(store: Bookstore): Observable<Bookstore> {
    console.log(store.address);
    
    return this.httpClient.post<Bookstore>(this.url, store)
  }

  updateBookstore(store: Bookstore): Observable<Bookstore> {
    return this.httpClient.put<Bookstore>(this.url, store)
  }

  deleteBookstore(id:number): Observable<Bookstore>{
    return this.httpClient.delete<Bookstore>(this.url+"/"+id)
  }
}
