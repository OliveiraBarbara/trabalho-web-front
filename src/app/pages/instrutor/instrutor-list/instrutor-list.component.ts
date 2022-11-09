import { InstrutorDeleteComponent } from './../instrutor-delete/instrutor-delete.component';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { Instrutor } from 'src/app/models/instrutor.model';
import { InstrutorService } from '../instrutor.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './instrutor-list.component.html',
  styleUrls: ['./instrutor-list.component.scss'],
})
export class InstrutorListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Instrutor[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = [
    'id',
    'cref',
    'nome',
    'telefone',
    'modalidade',
    'actions',
  ];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly instrutorService: InstrutorService,
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
          return this.instrutorService
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

  navigateToInstrutorCreate(): void {
    this.router.navigate(['/instrutor/cadastro']);
  }

  openDeleteDialog(instrutor: Instrutor): void {
    const dialogRef = this.dialog.open(InstrutorDeleteComponent, {
      data: instrutor,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.instrutorService.delete(instrutor.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.instrutorService.showMessage('Instrutor excluído com sucesso!');
        });
      }
    });
  }

  openDialog(instrutor: Instrutor): void {
    // let dialogRef = this.dialog.open(DialogComponent, {
    //   data: instrutor,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   this.data = result;
    // });
  }
}
