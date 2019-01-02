import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { GlobalService } from "../../services/global.service";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user : Observable<firebase.User>;
  public cUser : any;
  constructor(
    private storage: AngularFireStorage,    
    public datbs: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,) 
    
    {
      
    this.user = afAuth.authState;


    
    this.user.subscribe(currentUser => {
      globalService.user.next(currentUser);
      this.cUser = currentUser.email;

      if (currentUser) {
        this.datbs.object('/users/' + currentUser.uid).update({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          status: 'active',
          displayName: currentUser.displayName
        });
        
      }
    }); }


  ngOnInit() {
  }

  usershower(){
    this.cUser = firebase.auth().currentUser;
    console.log(this.cUser.email);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

}
