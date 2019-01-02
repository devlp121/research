import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadUrl: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }


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
      finalize(() => this.downloadUrl = imageRef.getDownloadURL() )
   )
  .subscribe()
  }


  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


}
