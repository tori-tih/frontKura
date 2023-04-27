import { Pipe, PipeTransform } from '@angular/core';
import { JointProduct } from '../interfaces/JointProduct';

@Pipe({
  name: 'jProductFilter'
})
export class JProductFilterPipe implements PipeTransform {

  transform(value: JointProduct[], priceStart: number, priveEnd: number, found: string): JointProduct[] {
    value = value
      .filter(x => x.nameProduct.toLowerCase().includes(found))
      .sort((x, y) => x.nameProduct.localeCompare(y.nameProduct));
    if (priceStart!==undefined && priveEnd!==undefined) { 
      value = value.filter(x => (priceStart <= x.price) && (x.price <= priveEnd)); 
    }
    return value;
  }

}
