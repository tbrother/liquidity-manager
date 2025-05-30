import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '@shared/types';

export interface CreateOrderRequest {
  term: number;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`).pipe(
      map((orders) => {
        const transformed = orders.map((order) => ({
          ...order,
          timestamp: new Date(order.timestamp),
        }));
        return transformed;
      }),
    );
  }

  createOrder(order: CreateOrderRequest): Observable<Order> {
    return this.http.post<any>(`${this.apiUrl}/orders`, order).pipe(
      map((order) => {
        const transformed = {
          ...order,
          timestamp: new Date(order.timestamp),
        };
        return transformed;
      }),
    );
  }
}
