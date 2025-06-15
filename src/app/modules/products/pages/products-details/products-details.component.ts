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
      this.product = this.productsService.getProductbyId(productId);
      if (!this.product) {
        console.error('Product not found');
      }
    } else {
      console.error('No product ID provided');
    }
  }
}
