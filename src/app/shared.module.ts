import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadPipe } from "./pipes/file-upload.pipe";


const pipes = [
  FileUploadPipe
]

@NgModule({
  declarations: [
    ...pipes
  ],
  exports:[
    ...pipes
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
