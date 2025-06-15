import { Component } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { PRODUCTS_MOCK } from 'src/app/shared/products-mock';
import { AuthService, User } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  searchProduct: string = '';
  minPrice: number = 0;
  maxPrice: number = 10000000;
  user: User | null = null;
  filterName: string = '';
  products: Product[] = [];
  currentPage = 1;
  pageSize = 8;
  paginatedProducts: Product[] = [];

  constructor(private authService: AuthService) {
    this.products = PRODUCTS_MOCK;
    this.updatePaginatedProducts();
    this.user = this.authService.getCurrentUser();
    console.log('Usuario actual:', this.user);
  }

  logout(): void {
    this.authService.logout();

    window.location.href = '/auth/login';
  }

  updatePaginatedProducts(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.products.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }
}
