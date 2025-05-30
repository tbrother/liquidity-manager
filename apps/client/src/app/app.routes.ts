import { Routes } from '@angular/router';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'order',
    component: OrderFormComponent,
    title: 'Create Order',
  },
];
