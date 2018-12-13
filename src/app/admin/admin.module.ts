import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { CompleteComponent } from './admin-components/complete/complete.component';
import { InProgressComponent } from './admin-components/in-progress/in-progress.component';
import { CustomersComponent } from './admin-components/customers/customers.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CompleteComponent,
    InProgressComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
