import { Component, Input, OnInit } from '@angular/core';
import { PdfUploadService } from '../services/pdf-upload.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html'
})
export class FileListComponent implements OnInit {
  files: any[] = [];
  isLoading = true;
  isFileLoaded = true;

  @Input() email: string = "";

  constructor(
    public toast: ToastComponent,
    public pdfUploadService: PdfUploadService) { }

  ngOnInit(): void {
    if (this.email) {
      this.getFilesByEmail(this.email);
    }
    else {
      this.getFiles();
    }
  }

  getFiles(): void {
    this.pdfUploadService.getFiles().subscribe(
      data => {
        console.log(data);
        this.files = data;
      },
      error => console.log(error),
      () => this.isFileLoaded = false
    );
  }

  getFilesByEmail(email: string): void {
    this.pdfUploadService.getFilesByEmail(email).subscribe(
      data => {
        console.log(data);
        this.files = data;
      },
      error => console.log(error),
      () => this.isFileLoaded = false
    );
  }

  downloadFile(file: any): void {
    if (file.url) {
      window.location.href = file.url;
    }
    else {
      this.toast.setMessage('this file is corrupted.', 'danger');
    }
  }
}
