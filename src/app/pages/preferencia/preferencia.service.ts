import { Preferencia } from './../../models/preferencia.model';
import { ResponseDataList } from './../../models/shared';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreferenciaService {
  baseApi: string = '/preferencia';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(preferencia: Preferencia): Observable<Preferencia> {
    return this.http.post<Preferencia>(
      environment.baseUrl + this.baseApi + '/add-pref',
      preferencia
    );
  }

  findById(id: number): Observable<Preferencia> {
    return this.http.get<Preferencia>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  update(id: number, preferencia: Preferencia): Observable<Preferencia> {
    return this.http.patch<Preferencia>(
      environment.baseUrl + this.baseApi + `/${id}`,
      preferencia
    );
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Preferencia>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Preferencia>>(
      environment.baseUrl + this.baseApi + '/ver-preferencia',
      { params }
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }
}
