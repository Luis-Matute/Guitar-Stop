import { Component, OnInit } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Guitar[] = [];

  constructor(private productService: ProductService,
    private cartService: CartService,
    private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      if (response) {
        this.products = response;
      }
    });
  }

  addToCart(product: Guitar) {
    console.log("Added to cart");
    this.cartService.addToCart(product).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  productDetails(productId: string): void {
    this.router.navigate([`/details/${productId}`]);
  }

}
