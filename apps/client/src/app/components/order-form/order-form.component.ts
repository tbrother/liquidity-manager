import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { OrderService, CreateOrderRequest } from '../../services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent implements OnDestroy {
  @Output() orderSubmitted = new EventEmitter<void>();

  orderForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  private subscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
  ) {
    this.orderForm = this.fb.group({
      term: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(100)]],
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';

      const orderRequest: CreateOrderRequest = {
        term: parseInt(this.orderForm.value.term),
        amount: parseFloat(this.orderForm.value.amount),
      };

      // Clean up any existing subscription
      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.orderService
        .createOrder(orderRequest)
        .subscribe({
          next: (order) => {
            this.isSubmitting = false;
            this.successMessage = `Order submitted successfully! Order ID: ${order.id}`;
            this.orderForm.reset();
            this.orderSubmitted.emit();
            // Navigate back to home after successful submission
            setTimeout(() => this.router.navigate(['/']), 1500);
          },
          error: (error) => {
            this.isSubmitting = false;
            this.errorMessage = 'Failed to submit order. Please try again.';
            console.error('Error submitting order:', error);
          },
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
