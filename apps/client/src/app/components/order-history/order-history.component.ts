import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '@shared/types';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-order-history',
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  isLoading = false;
  private subscription: Subscription | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    // Clean up any existing subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }

  formatTerm(termInMonths: number): string {
    if (termInMonths < 12) {
      return `${termInMonths} Month${termInMonths > 1 ? 's' : ''}`;
    } else if (termInMonths === 12) {
      return '1 Year';
    } else {
      const years = Math.round(termInMonths / 12);
      return `${years} Year${years > 1 ? 's' : ''}`;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
