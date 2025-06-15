import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { PRODUCTS_MOCK } from 'src/app/shared/products-mock';
import { AuthService, User } from 'src/app/shared/services/auth.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  searchProduct: string = '';
  orderProducts: string = 'asc';
  user: User | null = null;
  filterName: string = '';
  products: Product[] = [];
  currentPage = 1;
  pageSize = 8;
  paginatedProducts: Product[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.user = this.authService.getCurrentUser();
    console.log('Usuario actual:', this.user);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.updatePaginatedProducts();
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      },
    });
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
