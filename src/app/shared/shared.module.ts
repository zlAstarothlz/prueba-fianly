import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MATERIAL_MODULES } from './material';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FilterPipe,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULES,
  ],
  exports: [
    HeaderComponent,
    MATERIAL_MODULES,
    FilterPipe,
    OrderByPipe
  ],
})
export class SharedModule { }
