import { ResponseDataList } from './../../models/shared';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { LocalTreinamento } from 'src/app/models/local-treinamento.model';

@Injectable({
  providedIn: 'root',
})
export class LocalTreinamentoService {
  baseApi: string = '/local-treinamento';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(localTreinamento: LocalTreinamento): Observable<LocalTreinamento> {
    return this.http.post<LocalTreinamento>(
      environment.baseUrl + this.baseApi + '/add-localTreinamento',
      localTreinamento
    );
  }

  findById(id: number): Observable<LocalTreinamento> {
    return this.http.get<LocalTreinamento>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  update(
    id: number,
    localTreinamento: LocalTreinamento
  ): Observable<LocalTreinamento> {
    return this.http.patch<LocalTreinamento>(
      environment.baseUrl + this.baseApi + `/${id}`,
      localTreinamento
    );
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<LocalTreinamento>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<LocalTreinamento>>(
      environment.baseUrl + this.baseApi,
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
