import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl!: string;
  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    return this.http.post<any>(this.apiUrl, formData);
  }
  
  constructor(private http: HttpClient) { }

  saveImage(base64Data: string, fileName: string) {
    const url = 'src/assets/images';
    const data = {
      base64Data,
      fileName
    };
    
    return this.http.post("src/assets/images", data);
  }
}
