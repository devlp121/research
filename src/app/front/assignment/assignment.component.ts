import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CheckoutDialogComponent } from "../checkout-dialog/checkout-dialog.component";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



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


  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<any>;

  // State for dropzone CSS toggling
  isHovering: boolean;


  animal: string;
  name: string;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private storage: AngularFireStorage, 
    private db: AngularFirestore
    
    ) { }

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


   
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My Research PWA!' };
    const ref = this.storage.ref(path);

    // The main task
    const task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add( { path, size: snap.totalBytes })
        }
      })
    )

    // The file's download URL
    this.downloadURL = ref.getDownloadURL(); 
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
