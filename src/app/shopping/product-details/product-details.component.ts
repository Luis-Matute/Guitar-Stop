import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Guitar } from 'src/app/models/guitar';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from 'src/app/cart/cart.service';
import { Cart } from 'src/app/models/cart';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  product: Guitar = {} as Guitar;

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) { }

  @Input()
  set id(id: string) {
    this.productService.getProduct(id).subscribe({
      next: (result) => {
        console.log("Response:");
        console.log(result);
        this.product = result;
        console.log("Product:")
        console.log(this.product);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e.error.message);
        console.log(e.message);
        console.log(e.status);
        this.router.navigate(['**']);
      },
      complete: () => console.log('Completed obtaining product.')
    });
  }

  addToCart(): void {
    console.log("You hit the add cart method!");
    this.cartService.addToCart(this.product).subscribe({
      next: (result: Cart) => {
        console.log(result);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      complete: () => {
        console.log("Completed adding to cart!")
      }
    });
  }

}
