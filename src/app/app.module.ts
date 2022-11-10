import { RedDirective } from './directives/red.directive';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ExercicioComponent } from './pages/exercicio/exercicio-create/exercicio.component';
import { InstrutorComponent } from './pages/instrutor/instrutor-create/instrutor.component';
import { LocalTreinamentoComponent } from './pages/local-treinamento/local-treinamento-create/local-treinamento.component';
import { PreferenciaComponent } from './pages/preferencia/preferencia-create/preferencia.component';
import { InstrutorListComponent } from './pages/instrutor/instrutor-list/instrutor-list.component';
import { LocalTreinamentoListComponent } from './pages/local-treinamento/local-treinamento-list/local-treinamento-list.component';
import { PreferenciaListComponent } from './pages/preferencia/preferencia-list/preferencia-list.component';
import { ExercicioListComponent } from './pages/exercicio/exercicio-list/exercicio-list.component';
import { InstrutorDeleteComponent } from './pages/instrutor/instrutor-delete/instrutor-delete.component';
import { ClienteModule } from './pages/cliente/cliente.module';
import { AdminListComponent } from './pages/admin/admin-list/admin-list.component';
import { AdminCreateComponent } from './pages/admin/admin-create/admin-create.component';
import { AdminEditComponent } from './pages/admin/admin-edit/admin-edit.component';
import { AdminDeleteComponent } from './pages/admin/admin-delete/admin-delete.component';
import { InstrutorEditComponent } from './pages/instrutor/instrutor-edit/instrutor-edit.component';
import { PreferenciaEditComponent } from './pages/preferencia/preferencia-edit/preferencia-edit.component';
import { ExercicioEditComponent } from './pages/exercicio/exercicio-edit/exercicio-edit.component';
import { LocalTreinamentoEditComponent } from './pages/local-treinamento/local-treinamento-edit/local-treinamento-edit.component';
import { ExercicioDeleteComponent } from './pages/exercicio/exercicio-delete/exercicio-delete.component';
import { LocalTreinamentoDeleteComponent } from './pages/local-treinamento/local-treinamento-delete/local-treinamento-delete.component';
import { PreferenciaDeleteComponent } from './pages/preferencia/preferencia-delete/preferencia-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    RedDirective,
    HomeComponent,
    InstrutorComponent,
    PreferenciaComponent,
    LocalTreinamentoComponent,
    ExercicioComponent,
    MenuComponent,
    InstrutorListComponent,
    LocalTreinamentoListComponent,
    PreferenciaListComponent,
    ExercicioListComponent,
    InstrutorDeleteComponent,
    AdminListComponent,
    AdminCreateComponent,
    AdminEditComponent,
    AdminDeleteComponent,
    InstrutorEditComponent,
    PreferenciaEditComponent,
    ExercicioEditComponent,
    LocalTreinamentoEditComponent,
    ExercicioDeleteComponent,
    LocalTreinamentoDeleteComponent,
    PreferenciaDeleteComponent,
  ],
  imports: [
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClienteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
