import { ResponseDataList } from './../../models/shared';
import { Estado } from './../../models/estado.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private baseApi: string = '/estado/ver-estado';

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Estado[]> {
    const params = new HttpParams().set('limit', '99');

    return this.http
      .get<ResponseDataList<Estado>>(environment.baseUrl + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }
}
