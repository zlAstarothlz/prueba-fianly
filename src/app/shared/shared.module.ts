import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MATERIAL_MODULES } from './material';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULES,
  ],
  exports: [
    HeaderComponent,
    MATERIAL_MODULES
  ],
})
export class SharedModule { }
