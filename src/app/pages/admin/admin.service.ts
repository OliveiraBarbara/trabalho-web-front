import { Admin } from './../../models/admin.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseApi: string = '/admin';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(
      environment.baseUrl + this.baseApi + '/add-admin',
      admin
    );
  }

  findById(id: number): Observable<Admin> {
    return this.http.get<Admin>(environment.baseUrl + this.baseApi + `/${id}`);
  }

  update(id: number, admin: Admin): Observable<Admin> {
    return this.http.patch<Admin>(
      environment.baseUrl + this.baseApi + `/${id}`,
      admin
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
  ): Observable<ResponseDataList<Admin>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Admin>>(
      environment.baseUrl + this.baseApi + '/ver-admin',
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
