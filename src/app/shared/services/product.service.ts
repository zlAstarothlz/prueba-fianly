import { Injectable } from '@angular/core';
import { PRODUCTS_MOCK } from '../products-mock';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = PRODUCTS_MOCK;

  constructor() {}

  getProductbyId(id: string): Product | undefined {
    return this.products.find((product) => product.id.toString() === id);
  }
}
