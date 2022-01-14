import { Component, Input, OnInit } from '@angular/core';
import { PdfUploadService } from '../services/pdf-upload.service';
import { ToastComponent } from '../shared/toast/toast.component';
import * as copy from 'copy-to-clipboard';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  files: any[] = [];
  isLoading = true;
  isFileLoaded = true;

  @Input() email: string = "";

  constructor(
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
        // this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }

  onCopy(file: any) {
    copy(file.content)
  }

  formatLargeText(s: string): string {
      if(s.length < 20 ) return s;
      else return s.substring(0, 19) + '...';
  }
}
