import { Injectable } from '@angular/core';
import { PRODUCTS_MOCK } from '../products-mock';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  products: Product[] = [];
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProductById(id: string): Observable<Product | undefined> {
    if (this.products.length === 0) {
      return this.getAllProducts().pipe(
        map((products) => products.find((product) => product.id.toString() === id))
      );
    } else {
      return new Observable<Product | undefined>((observer) => {
        observer.next(this.products.find((product) => product.id.toString() === id));
        observer.complete();
      });
    }
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products) => {
        this.products = products;
        return this.products;
      })
    );
  }
}
