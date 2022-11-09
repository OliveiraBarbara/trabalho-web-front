import { Cliente } from './../../models/cliente.model';
import { ResponseDataList } from './../../models/shared';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  baseApi: string = '/cliente';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(
      environment.baseUrl + this.baseApi + '/add-cliente',
      cliente
    );
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  update(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.patch<Cliente>(
      environment.baseUrl + this.baseApi + `/${id}`,
      cliente
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Cliente>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Cliente>>(
      environment.baseUrl + this.baseApi + '/ver-cliente',
      { params }
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
