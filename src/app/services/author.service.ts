import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/Author';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  url = `${environment.apiUrl}/author`
  constructor(private httpClient: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(this.url)
  }

  addAuthor(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(this.url, author)
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.httpClient.put<Author>(this.url, author)
  }

  deleteAuthor(id:number): Observable<Author>{
    return this.httpClient.delete<Author>(this.url+"/"+id)
  }
}
