import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngIf="order"><h2>Order {{ order._id }}</h2><p>Status: {{ order.status }}</p><p>Total: {{ order.totalAmount }}</p></div>`
})
export class OrderDetail {
  order: any = null;
  constructor(private route: ActivatedRoute, private orders: OrderService) {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.orders.getOrder(id).subscribe((o: any) => this.order = o);
    }
  }
}
