import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from 'src/app/models/cart';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart = {} as Cart;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart("1").subscribe({
      next: (result) => {
        console.log("Success");
        this.cart = result;
      },
      error: (e: HttpErrorResponse) => {
        console.error(e.error);
      }
    })
  }

  clearCart() {
    let userId = "1";
    this.cartService.clearCart(userId).subscribe({
      next: (result) => {
        this.cart = result;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

}
