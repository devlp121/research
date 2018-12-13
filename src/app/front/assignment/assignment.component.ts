import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CheckoutDialogComponent } from "../checkout-dialog/checkout-dialog.component";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

export interface Assignment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  animal: string;
  name: string;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog) { }
    openDialog(): void {
      const dialogRef = this.dialog.open( CheckoutDialogComponent, {
        width: '300px',
        data: {name: this.name, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  assignment: Assignment[] = [
    {value: 'book', viewValue: 'Book Chapters'},
    {value: 'court', viewValue: 'Court Submissions'},
    {value: 'thesis', viewValue: 'Thesis'}
  ];

}
