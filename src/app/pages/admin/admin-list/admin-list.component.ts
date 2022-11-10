import { Admin } from './../../../models/admin.model';
import { AdminDeleteComponent } from './../admin-delete/admin-delete.component';
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
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Admin[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = [
    'id',
    'numReg',
    'nome',
    'telefone',
    'formacao',
    'actions',
  ];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly adminService: AdminService,
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
          return this.adminService
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

  navigateToAdminCreate(): void {
    this.router.navigate(['/admin/cadastro']);
  }

  openDeleteDialog(admin: Admin): void {
    const dialogRef = this.dialog.open(AdminDeleteComponent, {
      data: admin,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.delete(admin.id as number).subscribe(() => {
          this.paginator.firstPage();
          this.refresh.next(true);
          this.adminService.showMessage('Administrador excluído com sucesso!');
        });
      }
    });
  }

  /*openDialog(admin: Admin): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: admin,
    });
  }*/
}
