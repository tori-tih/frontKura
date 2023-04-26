import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JointProduct } from '../interfaces/JointProduct';
import { Bookstore } from '../interfaces/Bookstore';

@Injectable({
  providedIn: 'root'
})
export class JointProductService {

  url = `${environment.apiUrl}/jProduct`
  constructor(private httpClient: HttpClient) { }

  getJproduct(): Observable<JointProduct[]> {
    return this.httpClient.get<JointProduct[]>(this.url)
  }

  getJproductByStore(bookstore: Bookstore): Observable<JointProduct[]>{
    return this.httpClient.post<JointProduct[]>(this.url+"/store", bookstore)
  }

  addJproduct(jProduct: JointProduct): Observable<JointProduct> {
    return this.httpClient.post<JointProduct>(this.url, jProduct)
  }

  updateJproduct(jProduct: JointProduct): Observable<JointProduct> {
    return this.httpClient.put<JointProduct>(this.url, jProduct)
  }

  deleteJproductk(id:number): Observable<JointProduct>{
    return this.httpClient.delete<JointProduct>(this.url+"/"+id)
  }
}
