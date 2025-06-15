import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
 transform(value: Product[], order: string): Product[] {

    if (!value) {
      return [];
    }
    if (!order) {
      return value;
    }
    return value.slice().sort((a, b) => {
      const comparison = a.price - b.price;
      return order === 'asc' ? comparison : -comparison;
    });


  }

}
