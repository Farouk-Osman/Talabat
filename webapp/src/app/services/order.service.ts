import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(payload: any) {
    return this.http.post(`${environment.apiUrl}/orders`, payload);
  }

  getOrder(id: string) {
    return this.http.get(`${environment.apiUrl}/orders/${id}`);
  }

  listOrders() {
    return this.http.get(`${environment.apiUrl}/orders`);
  }
}
