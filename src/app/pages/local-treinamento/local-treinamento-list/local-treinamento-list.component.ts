import { LocalTreinamentoService } from './../local-treinamento.service';
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
import { LocalTreinamento } from 'src/app/models/local-treinamento.model';

@Component({
  selector: 'app-local-treinamento-list',
  templateUrl: './local-treinamento-list.component.html',
  styleUrls: ['./local-treinamento-list.component.scss'],
})
export class LocalTreinamentoListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: LocalTreinamento[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = [
    'idLocal',
    'nome',
    'valor',
    'horaFunc',
    'actions',
  ];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly localTreinamentoService: LocalTreinamentoService,
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
          return this.localTreinamentoService
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

  navigateToLocalTreinamentoCreate(): void {
    this.router.navigate(['/localTreinamento/cadastro']);
  }

  /*openDeleteDialog(localTreinamento: LocalTreinamento): void {
    const dialogRef = this.dialog.open(LocalTreinamentoDeleteComponent, {
      data: localTreinamento,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.localTreinamentoService
          .delete(localTreinamento.id as number)
          .subscribe(() => {
            this.paginator.firstPage();
            this.refresh.next(true);
            this.localTreinamentoService.showMessage(
              'Local de Treinamento excluído com sucesso!'
            );
          });
      }
    });
  }

  openSearchDialog(localTreinamento: LocalTreinamento): void {
    const dialogRef = this.dialog.open(LocalTreinamentoDeleteComponent, {
      data: localTreinamento,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.localTreinamentoService.delete(localTreinamento.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.localTreinamentoService.showMessage('Cliente excluído com sucesso!');
        });
      }
    });
  }*/
}
