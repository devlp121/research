
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { Router }    from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import { GlobalService } from '../../services/global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  admin: Observable<firebase.User>;
  newEmail: string;
  newPassword: string;
  newCellphone: string;
  showSignUp: boolean;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public router: Router,
    public snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta,
    public afs: AngularFirestore
  ) {
    

    this.admin = afAuth.authState;

    if (this.router.url.includes('login')) {
      this.showSignUp = false;
    } else if (this.router.url.includes('register')) {
      this.showSignUp = true;
    }

    this.admin.subscribe(currentAdmin => {

      if (currentAdmin) {
        db.object('/admins/' + this.globalService.hashCode(currentAdmin.email)).valueChanges().subscribe((admin:any) => {
          if (admin && admin.role) {
            this.db.object('/admins/' + currentAdmin.uid).update({
              uid: currentAdmin.uid,
              email: currentAdmin.email,
              photoURL: currentAdmin.photoURL,
              role: admin.role,
              active: true
            }).catch((err) => {
              console.log('Permission Error', err);
              this.router.navigateByUrl('');
              let snackBarRef = this.snackBar.open('You are not an authorized administrator', 'OK!', {
                duration: 3000
              });
            });

            this.router.navigateByUrl('admin');
          } else {
            this.router.navigateByUrl('');
          }
        });
      }
    });

    
  }

  ngOnInit() {
    this.title.setTitle('Login');
    this.meta.updateTag({ content: 'Login to the admin panel' }, "name='description'");
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  signUpWithEmail() {
    this.afs.collection('/users/').doc(this.newEmail).set({
      phone: '254' + this.newCellphone
    });    this.afAuth.auth.createUserWithEmailAndPassword(this.newEmail, this.newPassword).catch((error) => {
      let snackBarRef = this.snackBar.open(error.message, 'OK!', {
        duration: 3000
      });
    });
  }

  loginWithEmail() {
    this.afAuth.auth.signInWithEmailAndPassword(this.newEmail, this.newPassword).catch((error) => {
      let snackBarRef = this.snackBar.open(error.message, 'OK!', {
        duration: 3000
      });
    });
  }
}
