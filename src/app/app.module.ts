import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './front/nav/nav.component';
import { LoginComponent } from './front/login/login.component';
import { FeaturesComponent } from "./front/features/features.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { AssignmentComponent } from './front/assignment/assignment.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminModule } from './admin/admin.module';
import { OrdersComponent } from './admin/admin-components/orders/orders.component';
import { CheckoutDialogComponent } from './front/checkout-dialog/checkout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    FeaturesComponent,
    AssignmentComponent,
    OrdersComponent,
    CheckoutDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase, 'locus'),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AdminModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    CheckoutDialogComponent
  ]
})
export class AppModule { }
