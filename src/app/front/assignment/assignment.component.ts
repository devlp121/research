import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from "@angular/platform-browser";
import { CheckoutDialogComponent } from "../checkout-dialog/checkout-dialog.component";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, interval } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from 'firebase/app'
import { GlobalService } from "../../services/global.service";
import { MpesaService } from "../../services/mpesa.service";
import { HttpClient } from '@angular/common/http';
import { delay } from 'q';

export interface authToken {
  access_token: string,
  expires_in: string
}

export interface userDef {
  name: string;
}

export interface Assignment {
  value: string;
  viewValue: string;
}
export interface ResponseCode {
  MerchantRequestID: string,
  CheckoutRequestID: string,
  ResponseCode: string,
  ResponseDescription: string,
  CustomerMessage: string
}


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  user: Observable<firebase.User>;
  selectedValue: string;
  selected: string;
  task: AngularFireUploadTask;
  userCollection: Observable<any[]>
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadUrl: Observable<any>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  animal: string;
  name: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public json: JSON;
  public result: authToken;
  public oAuthToken: string;
  public oAuthExp: string;
  public lipaAuth: string;
  public Amount: string;
  public phoneNo: any;
  userInfo: AngularFirestoreCollection<any>;
  public item: AngularFirestoreDocument;
  currentEmail: string;
  respo: any;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,

    public title: Title,
    public datbs: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,

    public mpesa: MpesaService,
    public http: HttpClient,
  ) {


    this.user = afAuth.authState;
    this.user.subscribe(currentUser => {
      globalService.user.next(currentUser);

      if (currentUser) {
        this.afs.collection('/users/').doc(currentUser.uid).set({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          status: 'active',
        });
        this.currentEmail = currentUser.email
      }



      var docRef = this.afs.collection('users').doc(this.currentEmail);
      var getDoc = docRef.get()
        .subscribe(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            this.phoneNo = doc.data()
            console.log('Document data:', this.phoneNo);

          }
        })
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      width: '300px',
      data: { name: this.name, animal: this.animal }
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

    this.title.setTitle('Place an order')
  }
  assignment: Assignment[] = [
    { value: "1500", viewValue: 'Book Chapters' },
    { value: "1500", viewValue: 'Court Submissions' },
    { value: "1500", viewValue: 'Thesis' }
  ];



  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {

    const storageRef = firebase.storage().ref();

    // The File object
    const file = event.item(0)

    // Client-side validation example


    // The storage path
    const path = `instructions/${new Date().getTime()}_${file.name}`;
    const imageRef = this.storage.ref(path);

    // Totally optional metadata
    const customMetadata = { app: 'Customer uploaded instructions' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.afs.collection('photos').add({ path, size: snap.totalBytes })

        }
      })
    )

    // The file's download URL
    console.log('files done:')

    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = imageRef.getDownloadURL())
    )
      .subscribe()
  }


  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  logout() {
    this.afAuth.auth.signOut();
  }


  lipaFunct() {

    this.mpesa.getConfig().subscribe(
      () => this.mpesa.lipaFunction(this.selectedValue, this.phoneNo.phone).subscribe(
        response => {
          console.log("Sucess");
          this.respo = response
          console.log("Your"+ this.selected + "requested"+this.respo.CheckoutRequestID+"has been processed")
        },
        error => {
          console.log("Error", error);
        }
      )
    );


  }

}
