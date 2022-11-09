import { ResponseDataList } from './../../models/shared';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Exercicio } from 'src/app/models/exercicio.model';

@Injectable({
  providedIn: 'root',
})
export class ExercicioService {
  baseApi: string = '/exercicio';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(exercicio: Exercicio): Observable<Exercicio> {
    return this.http.post<Exercicio>(
      environment.baseUrl + this.baseApi + '/add-exercicio',
      exercicio
    );
  }

  findById(id: number): Observable<Exercicio> {
    return this.http.get<Exercicio>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  update(id: number, exercicio: Exercicio): Observable<Exercicio> {
    return this.http.patch<Exercicio>(
      environment.baseUrl + this.baseApi + `/${id}`,
      exercicio
    );
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Exercicio>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Exercicio>>(
      environment.baseUrl + this.baseApi + '/ver-exercicio',
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
