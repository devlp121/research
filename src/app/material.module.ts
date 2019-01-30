import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatNativeDateModule,
  MatInputModule,
  MatDatepickerModule,
  MatCardModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatBadgeModule,
  MatBadge
} from '@angular/material';
import {CdkStepperModule} from '@angular/cdk/stepper';


const components = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatBadgeModule,
  CdkStepperModule
];

@NgModule({
  declarations: [],
  imports: [
    components
  ],
  exports: [
    components
  ]
})
export class MaterialModule { }
