import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { CompleteComponent } from './admin-components/complete/complete.component';
import { InProgressComponent } from './admin-components/in-progress/in-progress.component';
import { CustomersComponent } from './admin-components/customers/customers.component';

const routepaths: Routes = [
  {
    path: 'admin', component: DashboardComponent,
    children: [
      {
        path: "",
        children: [
          { path: 'complete', component: CompleteComponent },
          { path: 'in-progress', component: InProgressComponent },
          { path: 'customers', component: CustomersComponent }]
      }]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routepaths)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
