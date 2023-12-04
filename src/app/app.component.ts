import { Component } from '@angular/core';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'guitar-stop';
  itemsCount: number = 0; 

  constructor(private cartService: CartService) {
    this.getCartItemsCount();
   }

  getCartItemsCount() {
    let userId = '1';
    let cart = this.cartService.getCart(userId);

    this.itemsCount = cart.items.length;
  }
}
