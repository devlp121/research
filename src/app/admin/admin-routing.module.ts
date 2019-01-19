import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { CompleteComponent } from './admin-components/complete/complete.component';
import { InProgressComponent } from './admin-components/in-progress/in-progress.component';
import { CustomersComponent } from './admin-components/customers/customers.component';
import { AdmindashComponent } from './admin-components/admindash/admindash.component';
import { DashboardadminComponent } from './admin-components/dashboardadmin/dashboardadmin.component';
import { PostsComponent } from './admin-components/posts/posts.component';
import { MessagesComponent } from './admin-components/messages/messages.component';
import { OrdersComponent } from './admin-components/orders/orders.component';
import { ReviewComponent } from './admin-components/review/review.component';

const routepaths: Routes = [
  {
    path: 'admin', component: DashboardadminComponent,
    children: [
      {
        path: "",
        children: [
          { path: '', component: AdmindashComponent },
          { path: 'complete', component: CompleteComponent },
          { path: 'in-progress', component: InProgressComponent },
          { path: 'posts', component: PostsComponent },
          { path: 'messages', component: MessagesComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'review', component: ReviewComponent },
          { path: 'customers', component: CustomersComponent }]
      }]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routepaths)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

