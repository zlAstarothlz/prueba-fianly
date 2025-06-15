import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductService);
  public product!: Product|undefined;
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productsService.getProductById(productId)
      .subscribe({
        next: (product) => {
          this.product = product;
          console.log('Producto encontrado:', this.product);
        },
        error: (error) => {
          console.error('Error al obtener el producto:', error);
        },
      });
    } else {
      console.error('No product ID provided');
    }
  }
}
