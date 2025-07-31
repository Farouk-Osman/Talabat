import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { Product } from '../../types/product';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.scss'
})
export class customer {
  http = inject(HttpClient);
  constructor() {}

  getNewProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/customer/new-products`);
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/customer/featured-products`);
  }

}
