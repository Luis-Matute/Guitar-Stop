import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CartModule { }
