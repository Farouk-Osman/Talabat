import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductCard } from '../product-card/product-card';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

import { Product } from '../../types/product';
import { customer } from '../../services/customer/customer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ProductCard, CarouselModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  };

  customerService = inject(customer);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages: Product[] = [];

  ngOnInit() {
    this.customerService.getNewProducts().subscribe({
      next: (data: Product[]) => {
        this.newProducts = data;
        this.bannerImages.push(...data);
      },
      error: (err) => console.error('Error fetching new products', err)
    });

    this.customerService.getFeaturedProducts().subscribe({
      next: (data: Product[]) => {
        this.featuredProducts = data;
        this.bannerImages.push(...data);
      },
      error: (err) => console.error('Error fetching featured products', err)
    });
  }
}
