import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ADDR } from '../address';

@Injectable({
  providedIn: 'root'
})
export class AddrService {
  getAddr(): Observable<string[]> { 
    return of(ADDR) 
  }
  constructor() { }
}
