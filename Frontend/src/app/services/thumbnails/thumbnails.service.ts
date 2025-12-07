import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Thumbnail } from '../../models/thumbnails/thumbnail.interface';

const api: string = environment.endpoint;

@Injectable({
  providedIn: 'root',
})
export class ThumbnailsService {
  
  private http = inject(HttpClient);

  getThumbnailById(id: number): Observable<Thumbnail> {
    const params = new HttpParams().append('id', id);
    return this.http.get<Thumbnail>(api + 'Thumbnail/getById', {params});
  }

  getAllThumbnails(ids: number[]): Observable<Thumbnail[]> {
    const params = new HttpParams({ fromObject: {ids} });    
    return this.http.get<Thumbnail[]>(api + 'Thumbnail/GetAll', {params});
  }

  
}
