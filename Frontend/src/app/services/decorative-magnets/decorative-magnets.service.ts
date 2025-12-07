import { Injectable } from '@angular/core';
import { DecorativeMagnet } from '../../models/decorative-magnets/decorative-magnet.interface';
import { ApiServiceAbstract } from '../generics/api.service-abstract.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedList } from '../../models/paginated-list/paginated-list.interface';
import { environment } from '../../../environments/environment';

const api: string = environment.endpoint;

@Injectable({
  providedIn: 'root',
})
export class DecorativeMagnetsService extends ApiServiceAbstract<DecorativeMagnet> {
  
  constructor(private http: HttpClient) {
    super({
      http: http,
      controllerName: 'DecorativeMagnet',
      getAllFunction: '',
      getAllByIdFunction: '',
      getAllByIdQueryParam: '',
      getByIdFunction: 'GetById',
      getByIdQueryParam: 'id',
      createFunction: 'Create',
      updateFunction: 'Update',
      deleteFunction: 'Delete',
      deleteQueryParam: 'id',
    });
  }

  getPagedList(pageNumber: number, pageSize: number): Observable<PaginatedList<DecorativeMagnet>> {
    const params: HttpParams = new HttpParams()
    .append('pageNumber', pageNumber)
    .append('pageSize', pageSize);
    
    return this.http.get<PaginatedList<DecorativeMagnet>>(api + 'DecorativeMagnet/GetPagedList', {params});
  }

}