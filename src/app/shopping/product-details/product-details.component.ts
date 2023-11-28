import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Guitar } from 'src/app/models/guitar';
import { HttpErrorResponse } from '@angular/common/http';
import { Specification } from 'src/app/models/specification';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  product: Guitar = {} as Guitar;

  constructor(private productService: ProductService, private router: Router) { }

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
      complete: () => console.log('Complete')
    });
  }
}
