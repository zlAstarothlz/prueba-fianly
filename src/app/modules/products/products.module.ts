import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
