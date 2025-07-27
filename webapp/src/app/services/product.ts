import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  
  constructor() {}

  getProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }
  getProductById(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
  addProduct(product: Product) {
    return this.http.post(`${environment.apiUrl}/products`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
  updateProduct(id: string, product: Product) {
    return this.http.put(`${environment.apiUrl}/products/${id}`, product);
  }
  
}
