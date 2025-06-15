import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  // transform(value: Product[], productName: string): Product[] {
  //   console.log('FilterPipe', value, productName);
  //   if (!value) {
  //     return [];
  //   }
  //   if (!productName) {
  //     return value;
  //   }
  //   const filterProducts = value.filter((product) =>
  //     product.name.toLowerCase().includes(productName.toLowerCase())
  //   );
  //   return filterProducts;

  // }


//  transform(products: Product[], min: number = 0, max: number = Number.MAX_VALUE): Product[] {
//     if (!products) return [];
//     return products.filter(p => p.price >= min && p.price <= max);
//   }


transform(
  value: Product[],
  productName: string,
  minPrice: number = 0,
  maxPrice: number = Number.MAX_VALUE
): Product[] {
  if (!value) return [];

  return value.filter(product => {
    const matchesName = !productName || product.name.toLowerCase().includes(productName.toLowerCase());
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesName && matchesPrice;
  });
}







}
