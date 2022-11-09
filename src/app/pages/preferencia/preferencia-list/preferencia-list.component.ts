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
import { Preferencia } from 'src/app/models/preferencia.model';
import { PreferenciaService } from '../preferencia.service';

@Component({
  selector: 'app-preferencia-list',
  templateUrl: './preferencia-list.component.html',
  styleUrls: ['./preferencia-list.component.scss'],
})
export class PreferenciaListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Preferencia[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['idPref', 'material', 'periodo', 'actions'];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly preferenciaService: PreferenciaService,
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
          return this.preferenciaService
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

  navigateToPreferenciaCreate(): void {
    this.router.navigate(['/preferencia/cadastro']);
  }

  /*openDeleteDialog(preferencia: Preferencia): void {
    const dialogRef = this.dialog.open(PreferenciaDeleteComponent, {
      data: preferencia,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.preferenciaService
          .delete(preferencia.id as number)
          .subscribe(() => {
            this.paginator.firstPage();
            this.refresh.next(true);
            this.preferenciaService.showMessage(
              'Peferencia excluída com sucesso!'
            );
          });
      }
    });
  }

  openSearchDialog(preferencia: Preferencia): void {
    const dialogRef = this.dialog.open(PreferenciaDeleteComponent, {
      data: preferencia,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.preferenciaService.delete(preferencia.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.preferenciaService.showMessage('Preferência excluída com sucesso!');
        });
      }
    });
  }*/
}
