import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { Guitar } from '../models/guitar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.apiUrl;

  cart: Cart = {
    id:'1',
    items: []
  };

  constructor(private http: HttpClient) { }

  getCart(userId: string)/*: Observable<Cart>*/{
    return this.getCartFromLocalStorage();
    // return this.http.get<Cart>(`${this.apiUrl}/cart/${userId}`);
  }

  clearCart(cartId: string)/*: Observable<Cart> */{
    let cart = this.getCartFromLocalStorage();

    cart.items = []; 

    this.saveCartToLocalStorage(cart);
    return cart;
  }

  addToCart(product: Guitar) /* Observable<Cart> */ {
    let cart: Cart = this.getCartFromLocalStorage();
    cart.items.push(product);

    this.saveCartToLocalStorage(cart);
    console.log("Cart:");
    console.log(cart);
    return cart;
    // return this.http.post<Cart>(`${this.apiUrl}/addToCart`, product);
  }

  removeFromCart(product: Guitar) {
    let cart = this.getCartFromLocalStorage();
    console.log("Cart before:");
    console.log(cart);

    cart.items = cart.items.filter(item => item.id !== product.id);

    console.log("Cart after filter:");
    console.log(cart);

    this.saveCartToLocalStorage(cart);

    return cart;
  }

  itemIsInCart(product: Guitar): boolean {
    let cart = this.getCartFromLocalStorage();

    let isInCart = false;
    cart.items.forEach(item => {
      if (item.id === product.id) isInCart = true;
    });

    return isInCart;
  }

  private getCartFromLocalStorage(): Cart {
    let savedItemsJsonString = localStorage.getItem("cart");

    return savedItemsJsonString ? JSON.parse(savedItemsJsonString) : {id: '1', items: []};
  }

  private saveCartToLocalStorage(cart: Cart): void {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
