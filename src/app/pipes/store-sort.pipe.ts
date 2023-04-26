import { Pipe, PipeTransform } from '@angular/core';
import { Bookstore } from '../interfaces/Bookstore';

@Pipe({
  name: 'storeSort'
})
export class StoreSortPipe implements PipeTransform {

  transform(value: Bookstore[]): Bookstore[] {
    return  value.sort((x, y) => x.address.toLowerCase().trim().localeCompare(y.address.toLowerCase().trim()));;
  }

}
