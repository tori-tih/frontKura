import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/Book';

@Pipe({
  name: 'pricefilter'
})
export class PricefilterPipe implements PipeTransform {

  transform(value: Book[], priceStart: number, priveEnd: number, found: string): Book[] {
    value = value
      .filter(x => x.nameBook.toLowerCase().includes(found))
      .sort((x, y) => x.nameBook.localeCompare(y.nameBook));
    if (priceStart!==undefined && priveEnd!==undefined) { 
      value = value.filter(x => (priceStart <= x.price) && (x.price <= priveEnd)); 
    }
    return value;
  }

}
