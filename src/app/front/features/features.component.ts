import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  public title : string = "Research Locus";

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
