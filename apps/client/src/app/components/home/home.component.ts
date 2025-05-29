import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { YieldCurveChartComponent } from '../yield-curve-chart/yield-curve-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, OrderHistoryComponent, YieldCurveChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild('orderHistory') orderHistory!: OrderHistoryComponent;

  onOrderSubmitted(): void {
    if (this.orderHistory) {
      this.orderHistory.loadOrders();
    }
  }
} 