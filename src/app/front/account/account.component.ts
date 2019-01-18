import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { GlobalService } from "../../services/global.service";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";
import { WalletdialogComponent } from '../walletdialog/walletdialog.component';
import { MatDialog } from "@angular/material";

export interface Order {
  orderTitle: string,
  orderDescription: string,
  OrderAmount: string
  orderActive: string,
  transactionID: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: Observable<firebase.User>;
  public cUser: any;
  public currentEmail: string;
  public ordersDone: any;
  private ordersCollection: AngularFirestoreCollection
  items : Observable<any[]>

  constructor(
    private storage: AngularFireStorage,
    public datbs: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public dialog: MatDialog,
    public afs: AngularFirestore
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


      this.ordersCollection = afs.collection(`orders/details/${this.currentEmail}`);
      this.items = this.ordersCollection.valueChanges( )

    });

  }


  ngOnInit() {
  }

  walletdialog() {


    const dialogRef = this.dialog.open(WalletdialogComponent, {
      width: '70vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    console.log('really exciting wallet')
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
