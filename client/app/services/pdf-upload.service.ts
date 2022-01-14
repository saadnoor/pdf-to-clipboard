import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class PdfUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(fileInfo: FormData): Observable<any> {
    return this.http.post('/api/file', fileInfo);
  }

  getFiles(): Observable<any> {
    return this.http.get('/api/files');
  }

  getFilesByEmail(email: string): Observable<any> {
    return this.http.get(`/api/files/${email}`);
  }

}
