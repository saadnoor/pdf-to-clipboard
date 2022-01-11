import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  file: File | undefined;
  constructor() { }

  onFileChange(files: any): void {
    if (files.length > 0) {
      this.file = files[0];
    }
  }
}
