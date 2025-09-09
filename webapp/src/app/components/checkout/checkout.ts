import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html'
})
export class Checkout {
  form: any;
  cartItems: any[] = [];

  constructor(private fb: FormBuilder, private cart: CartService, private orders: OrderService, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cartItems = this.cart.items;
  }

  get total() {
    return this.cart.getTotal();
  }

  async placeOrder() {
    if (this.form.invalid) return;
    const address = this.form.value;
    const items = this.cart.items.map(i => ({ productId: i.product._id, quantity: i.quantity }));
    try {
      const res: any = await this.orders.createOrder({ items, address, paymentMethod: 'mock' }).toPromise();
      // on success clear cart and navigate to order page
      this.cart.clearCart();
      const orderId = res && res.orderId;
      if (orderId) this.router.navigate(['/orders', orderId]);
    } catch (err) {
      console.error('placeOrder error', err);
      // TODO: show notification
    }
  }
}
