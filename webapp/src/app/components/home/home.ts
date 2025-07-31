import { Component, inject } from '@angular/core';
import { Product } from '../../types/product';
import { customer } from '../../services/customer/customer';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule,MatButtonModule,ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  customerService = inject(customer);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  ngOnInit() {
    this.customerService.getNewProducts().subscribe({
      next: (data: Product[]) => {
        this.newProducts = data;
      },
      error: (err) => {
        console.error('Error fetching new products', err);
      }
    });

    this.customerService.getFeaturedProducts().subscribe({
      next: (data: Product[]) => {
        this.featuredProducts = data;
      },
      error: (err) => {
        console.error('Error fetching featured products', err);
      }
    });

  }
  
}
