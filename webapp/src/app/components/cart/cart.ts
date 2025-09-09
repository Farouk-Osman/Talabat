import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import type { CartItem } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink, FormsModule],
  template: `
    <div class="cart-container">
      <h2>Your Cart</h2>
      
      @if (cartItems.length === 0) {
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <button mat-raised-button color="primary" routerLink="/">Continue Shopping</button>
        </div>
      } @else {
        <div class="cart-items">
          @for (item of cartItems; track item.product._id ?? $index) {
            <div class="cart-item">
              <img [src]="item.product.images[0]" [alt]="item.product.name" class="product-image">
              <div class="item-details">
                <h3>{{ item.product.name }}</h3>
                <p>{{ item.product.shortDescription }}</p>
                <div class="price-info">
                  @if (item.product.discount) {
                    <span class="original-price">{{ item.product.price | currency }}</span>
                    <span class="discounted-price">
                      {{ item.product.price * (1 - item.product.discount/100) | currency }}
                    </span>
                  } @else {
                    <span class="price">{{ item.product.price | currency }}</span>
                  }
                </div>
              </div>
              <div class="quantity-controls">
                <button mat-icon-button (click)="updateQuantity(item.product._id!, item.quantity - 1)" [disabled]="item.quantity <= 1">
                  <mat-icon>remove</mat-icon>
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button mat-icon-button (click)="updateQuantity(item.product._id!, item.quantity + 1)">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
              <button mat-icon-button color="warn" (click)="removeFromCart(item.product._id!)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          }
        </div>
        
        <div class="cart-summary">
          <div class="total">
            <span>Total:</span>
            <span class="total-amount">{{ total | currency }}</span>
          </div>
          <button mat-raised-button color="primary" (click)="checkout()">Proceed to Checkout</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .empty-cart {
      text-align: center;
      padding: 3rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 8px;
    }

    .product-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details {
      flex: 1;
    }

    .price-info {
      margin-top: 0.5rem;
    }

    .original-price {
      text-decoration: line-through;
      color: #999;
      margin-right: 0.5rem;
    }

    .discounted-price {
      color: #e53935;
      font-weight: bold;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .quantity {
      min-width: 2rem;
      text-align: center;
    }

    .cart-summary {
      margin-top: 2rem;
      padding: 1rem;
      border-top: 1px solid #eee;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
    }

    .total {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .total-amount {
      margin-left: 1rem;
      color: #1976d2;
    }
  `]
})
export class Cart implements OnInit {
  private readonly cartService = inject(CartService);
  cartItems: CartItem[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.cartItems = this.cartService.items;
    this.total = this.cartService.getTotal();
    
    // Subscribe to cart changes
    this.cartService.cart$.subscribe(() => {
      this.cartItems = this.cartService.items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(productId: string | undefined, quantity: number): void {
    if (productId && quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
      this.cartItems = this.cartService.items;
      this.total = this.cartService.getTotal();
    }
  }

  removeFromCart(productId: string | undefined): void {
    if (productId) {
      this.cartService.removeFromCart(productId);
      this.cartItems = this.cartService.items;
      this.total = this.cartService.getTotal();
    }
  }

  checkout(): void {
    // TODO: Implement checkout flow
    console.log('Proceeding to checkout...');
  }
}
