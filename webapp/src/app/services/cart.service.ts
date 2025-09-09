import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  addToCart(product: Product, quantity: number = 1) {
    const existingItem = this.cartItems.find(item => item.product._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.updateCart();
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.cartItems.find(item => item.product._id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const price = item.product.discount ? 
        item.product.price * (1 - item.product.discount/100) : 
        item.product.price;
      return total + (price * item.quantity);
    }, 0);
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  get items(): CartItem[] {
    return this.cartItems;
  }
}
