import { Component, OnInit } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Guitar[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      if (response) {
        this.products = response;
      }
    });
  }

}
