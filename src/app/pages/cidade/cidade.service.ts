import { environment } from '../../../environments/environment';
import { ResponseDataList } from '../../models/shared';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cidade } from '../../models/cidade.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  private baseApi: string = '/cidade/ver-cidade';

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Cidade[]> {
    const params = new HttpParams().set('limit', '99');

    return this.http
      .get<ResponseDataList<Cidade>>(environment.baseUrl + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }
}
