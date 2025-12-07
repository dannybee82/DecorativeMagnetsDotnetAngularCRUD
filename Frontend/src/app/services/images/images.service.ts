import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../../models/images/image.interface';

const api: string = environment.endpoint;

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  
  private http = inject(HttpClient);

  getImageById(id: number): Observable<Image> {
    const params: HttpParams = new HttpParams().append('id', id);
    return this.http.get<Image>(api + 'Image/GetById', {params});
  }

}
