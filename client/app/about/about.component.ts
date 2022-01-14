import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PdfUploadService } from '../services/pdf-upload.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class PdfUploadComponent {
  file!: File;
  isLoading = false;
  form!: FormGroup;
  text: string = "";

  constructor(private pdfUploadService: PdfUploadService) { }

  onFileChange(event: any): void {
    console.log(event.target.files)
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
  
}
