import { ResponseDataList } from './../../models/shared';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Instrutor } from './../../models/instrutor.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstrutorService {
  baseApi: string = '/instrutor';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(instrutor: Instrutor): Observable<Instrutor> {
    return this.http.post<Instrutor>(
      environment.baseUrl + this.baseApi + '/add-instrutor',
      instrutor
    );
  }

  findById(id: number): Observable<Instrutor> {
    return this.http.get<Instrutor>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  update(id: number, instrutor: Instrutor): Observable<Instrutor> {
    return this.http.patch<Instrutor>(
      environment.baseUrl + this.baseApi + `/${id}`,
      instrutor
    );
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Instrutor>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Instrutor>>(
      environment.baseUrl + this.baseApi + '/ver-instrutor',
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
