import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  ohsGYRDKKybnbj: any[] = [];
  total: number = 0;
  checkoutForm!: FormGroup;
  cardDetails: any;
  address!:string;
  order_id!: string;
  order_date!: String;
  order_time!: String;

  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { this.setDefaultValues();
      this.generateOrderId(); 
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encodedCartData = params['ohsGYRDKKybnbj'];
      this.ohsGYRDKKybnbj = JSON.parse(atob(encodedCartData));
      this.total = params['total'];
    });

    function cardHolderNameValidator(control: FormControl) {
      const nameRegex = /^[a-zA-Z\s]*$/;
    
      if (control.value && !nameRegex.test(control.value.trim())) {
        return { invalidCardHolderName: true };
      }
    
      return null;
    }

    this.checkoutForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      cardHolderName: ['', [Validators.required, cardHolderNameValidator]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{4}$')]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      billingAddress: ['', Validators.required]
    });

    const userId = localStorage.getItem('id');
    if (userId) {
      this.getCardDetails(userId);
    }
  }

  

  getCardDetails(userId: string) {
    this.productService.getCardDetails(userId).subscribe(
      (data) => {
        if (data.length > 0) {
          this.cardDetails = data[0];
          this.autoFillForm();
        } else {
          this.cardDetails = null;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  autoFillForm() {
    const { cardNumber, cardHolderName, expirationDate, cvv, billingAddress } = this.cardDetails;
    if (cardNumber && expirationDate && cvv) {
      this.checkoutForm.get('cardNumber')?.setValue(cardNumber);
      this.checkoutForm.get('cardHolderName')?.setValue(cardHolderName)
      this.checkoutForm.get('expirationDate')?.setValue(expirationDate);
      this.checkoutForm.get('cvv')?.setValue(cvv);
    }
  }

  saveCardDetails() {
    const userId = localStorage.getItem('id');
    const { cardNumber, cardHolderName, expirationDate, cvv } = this.checkoutForm.value;
  
    const payload = {
      userId: userId,
      cardNumber: cardNumber,
      cardHolderName: cardHolderName,
      expirationDate: expirationDate,
      cvv: cvv
    };
  
    this.productService.saveCard(payload).subscribe(
      () => {
        alert('Card Details Saved Successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setDefaultValues() {
    const currentDate = new Date();
    this.order_date = currentDate.toISOString().substr(0, 10);

    const currentHour = currentDate.getHours().toString().padStart(2, '0');
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
    this.order_time = `${currentHour}:${currentMinute}`;
  }

  generateOrderId() {
    const randomNum = Math.floor(Math.random() * 1000);
    this.order_id = `#P:ODR-${randomNum}`;
  }

  deleteCartData() {
    const user_id = localStorage.getItem('id');
    this.productService.deleteAllData(user_id!).subscribe();
  }

  get form() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      return;
    }
    
    const user_id = localStorage.getItem('id');
    const payload = {
      order_id: this.order_id,
      user_id: user_id,
      amount: this.total,
      status: 'Processing',
      date: this.order_date,
      time: this.order_time,
      details: this.ohsGYRDKKybnbj.map(item => `${item.productName}: ${item.quantity}`).join(', '),
      address: this.checkoutForm.value.billingAddress
    };
  
    this.productService.saveOrder(payload).subscribe(
      (response) => {
        console.log(response);
        this.deleteCartData();
        this.router.navigate(['/order-history']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
