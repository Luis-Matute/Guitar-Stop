import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/cart/cart.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  cart: Cart = {} as Cart;
  checkoutForm: FormGroup = new FormGroup({});

  constructor(private cartService: CartService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      address: this.formBuilder.group({
        streetAddress: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
      // streetAddress: ['', Validators.required],
      // city: ['', Validators.required],
      // state: ['', Validators.required],
      // zipCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });
    
    
    let userId = "1";
    this.cart = this.cartService.getCart(userId);
    
    // .subscribe({
    //   next: (result) => {
    //     console.log("Result");
    //     console.log(result);
    //     this.cart = result;
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     console.log("Error while obtaining cart");
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log("Completed obtaining cart.");
    //   }
    // });
  }

  onFormSubmit() {
    console.log("Form submitted");
    if (this.checkoutForm.valid) {
      console.log("Form is valid!");
      window.alert("Your items will be shipped to you shortly!");

    } else {
      console.log("Form is invalid!");
      console.log(this.checkoutForm);
    }
  }


}
