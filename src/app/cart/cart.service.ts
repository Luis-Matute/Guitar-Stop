import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/cart/${userId}`);
  }

  clearCart(cartId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/clearCart/${cartId}`);
  }


}
