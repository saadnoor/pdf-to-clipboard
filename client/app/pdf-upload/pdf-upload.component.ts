import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PdfUploadService } from '../services/pdf-upload.service';
import * as copy from 'copy-to-clipboard';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.scss']
})
export class PdfUploadComponent {
  file!: File;
  isLoading = false;
  form!: FormGroup;
  text: string = "";
  copyButtonText = "Copy"

  constructor(private pdfUploadService: PdfUploadService,
    private auth: AuthService,) { 
      console.log(this.auth.currentUser)
    }

  onFileChange(event: any): void {
    let files = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      this.onSubmit()
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('email', this.auth.currentUser.email ? this.auth.currentUser.email : "");

    this.pdfUploadService.uploadFile(formData)
    .subscribe(
    (res: any) => {
      this.handleSuccessfulUpload(res);
    },
    () => {
      this.handleUploadError();
    }
  );
  }

  handleSuccessfulUpload(res: any) {
    console.log("file uploaded", res)
    this.text = res.content;
  }
  handleUploadError() {
    throw new Error('Method not implemented.');
  }
  
  onCopyToClipBoard() {
    this.copyButtonText = "Copied";
    setTimeout(() => {
      this.copyButtonText = "Copy";
    }, 10000);
    
    copy(this.text)
  }
}
