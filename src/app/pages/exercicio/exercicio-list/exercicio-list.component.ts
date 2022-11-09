import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {
  Subscription,
  Subject,
  distinctUntilChanged,
  debounceTime,
  merge,
  startWith,
  switchMap,
  catchError,
  of,
  map,
} from 'rxjs';
import { Exercicio } from 'src/app/models/exercicio.model';
import { ExercicioService } from '../exercicio.service';

@Component({
  selector: 'app-exercicio-list',
  templateUrl: './exercicio-list.component.html',
  styleUrls: ['./exercicio-list.component.scss'],
})
export class ExercicioListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Exercicio[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['idExec', 'tipo', 'tempoExec', 'actions'];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly exercicioService: ExercicioService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [],
    });

    const sub = this.form /*observador da consulta*/
      .get('search')!
      .valueChanges.pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe(() => {
        this.paginator.firstPage();
        this.refresh.next(true);
      });
    this.subscriptions.push(sub);
  }

  ngAfterViewInit(): void {
    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const search = this.form.get('search')?.value;
          return this.exercicioService
            .list(this.paginator.pageIndex + 1, this.paginator.pageSize, search)
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          /*dados retornados do back no front*/
          this.isLoadingResults = false;
          if (data) {
            this.resultsLength = data.meta.totalItems;
            return data.items;
          }
          return [];
        })
      )
      .subscribe((data) => (this.data = data));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    /*componente está sendo distruído */
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  navigateToExercicioCreate(): void {
    this.router.navigate(['/exercicio/cadastro']);
  }

  /*openDeleteDialog(exercicio: Exercicio): void {
    const dialogRef = this.dialog.open(ExercicioDeleteComponent, {
      data: exercicio,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.exercicioService
          .delete(exercicio.id as number)
          .subscribe(() => {
            this.paginator.firstPage();
            this.refresh.next(true);
            this.exercicioService.showMessage(
              'Exercício excluído com sucesso!'
            );
          });
      }
    });
  }

  openSearchDialog(exercicio: Exercicio): void {
    const dialogRef = this.dialog.open(ExercicioDeleteComponent, {
      data: exercicio,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.exercicioService.delete(exercicio.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.exercicioService.showMessage('Exercício excluído com sucesso!');
        });
      }
    });
  }*/
}
