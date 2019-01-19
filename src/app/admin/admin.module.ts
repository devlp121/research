import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { CompleteComponent } from './admin-components/complete/complete.component';
import { InProgressComponent } from './admin-components/in-progress/in-progress.component';
import { CustomersComponent } from './admin-components/customers/customers.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashComponent } from './admin-components/admindash/admindash.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardadminComponent } from './admin-components/dashboardadmin/dashboardadmin.component';
import { ReviewComponent } from './admin-components/review/review.component';
import { PostsComponent } from './admin-components/posts/posts.component';
import { MessagesComponent } from './admin-components/messages/messages.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CompleteComponent,
    InProgressComponent,
    CustomersComponent,
    AdmindashComponent,
    DashboardadminComponent,
    ReviewComponent,
    PostsComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class AdminModule { }
