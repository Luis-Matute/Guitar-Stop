import { Component, OnInit } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Guitar[] = [];
  filteredProducts: Guitar[] = [];
  filteredBrands: string[] = [];
  brands: string[] = [];
  form: FormGroup;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private _formBuilder: FormBuilder) {

      this.form = this._formBuilder.group({
        brands: new FormArray([])
      });

      this.addCheckboxes();
    }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (result) => {
        console.log("Products results:");
        console.log(result);
        this.products = result;
        this.filteredProducts = result;
      },
      error: (err: HttpErrorResponse) => {
        console.error("An error occured while obtaining products!");
        console.error(err);
      },
      complete: () => {
        this.brands = [...new Set(this.products.map(guitar => guitar.brand))];
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

  something(checked: boolean, brand: string) {
    console.log(checked);
    console.log(brand);

    if (checked) {
      this.filteredBrands.push(brand);
    } else {
      this.filteredBrands = this.filteredBrands.filter(brands => brands !== brand);
    }

    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => this.filteredBrands.length == 0 ? this.products : this.filteredBrands.includes(product.brand));
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLocaleLowerCase();

    this.filteredProducts = this.products.filter(product => product.name.toLocaleLowerCase().includes(searchTerm));
  }


  private addCheckboxes() {
    this.filteredBrands.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  get ordersFormArray() {
    return this.form.controls['brands'] as FormArray;
  }

}
