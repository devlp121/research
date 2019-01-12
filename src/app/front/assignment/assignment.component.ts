import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from "@angular/platform-browser";
import { CheckoutDialogComponent } from "../checkout-dialog/checkout-dialog.component";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app'
import { GlobalService } from "../../services/global.service";
import { MpesaService } from "../../services/mpesa.service";
import { error } from 'util';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface authToken {
  access_token: string,
  expires_in: string
}

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
  user: Observable<firebase.User>;


  // Main task 
  task: AngularFireUploadTask;

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
  public result: authToken;

  public oAuthToken: string;
  public oAuthExp: string;
  public lipaAuth: string;
  url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private storage: AngularFireStorage,
    private db: AngularFirestore,

    public title: Title,
    public datbs: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,

    public mpesa: MpesaService,
    public http: HttpClient

  ) {


    this.user = afAuth.authState;
    this.user.subscribe(currentUser => {
      globalService.user.next(currentUser);

      if (currentUser) {
        this.datbs.object('/users/' + currentUser.uid).update({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          status: 'active'
        });

      }
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
    { value: 'book', viewValue: 'Book Chapters' },
    { value: 'court', viewValue: 'Court Submissions' },
    { value: 'thesis', viewValue: 'Thesis' }
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
          this.db.collection('photos').add({ path, size: snap.totalBytes })

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

  tokenizer() {
    this.mpesa.getConfig().subscribe(
      body => {
        this.result = body;
        this.oAuthToken = this.result.access_token;
        this.oAuthExp = this.result.expires_in;
      }
    )

  }

  lipaFunction() {
    this.lipaAuth = "Bearer " + this.oAuthToken;
    const json = {
      "BusinessShortCode": "174379",
      "Password": "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
      "Timestamp": "2019-01-15T22:18:36+03:00",
      "TransactionType": "CustomerPayBillOnline",
      "Amount": "1",
      "PartyA": "254701737488",
      "PartyB": "174379",
      "PhoneNumber": "254701737488",
      "CallBackURL": "",
      "AccountReference": " ",
      "TransactionDesc": "Pay to Researh Locus and begin your transaction"
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.lipaAuth,
        'Access-Control-Allow-Origin': "http://localhost:4200",
        "Content-Type": "application/json",
        'accept': 'application/json, application/xml'

      })
    };
    console.log(this.lipaAuth, json)

    this.http.post(this.url, json, httpOptions).pipe(
      tap(
        (body) => {
          console.log("comming up" + body)
        }
      )
    )

  }

}
