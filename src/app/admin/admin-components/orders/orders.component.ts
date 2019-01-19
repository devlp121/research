import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
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

}
