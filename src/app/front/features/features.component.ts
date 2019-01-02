import { Component, OnInit } from '@angular/core';
import { Title, Meta} from '@angular/platform-browser'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app'
import { GlobalService } from "../../services/global.service";

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  
  user : Observable<firebase.User>;
  public site : string = "Research Locus";


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public title : Title
  ) {


    this.user = afAuth.authState;
    this.user.subscribe(currentUser => {
      globalService.user.next(currentUser);

      if (currentUser) {
        this.db.object('/users/' + currentUser.uid).update({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          status: 'active'
        });

        this.db.object('/users/' + currentUser.uid).valueChanges().subscribe((user:any) => {
          if (user.cart) {
            globalService.cart.next(user.cart);
          }
        });
      }

     
    });
  }
ngOnInit() {
  this.title.setTitle('Home');
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}