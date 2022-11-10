import { LocalTreinamentoEditComponent } from './pages/local-treinamento/local-treinamento-edit/local-treinamento-edit.component';
import { ExercicioEditComponent } from './pages/exercicio/exercicio-edit/exercicio-edit.component';
import { PreferenciaEditComponent } from './pages/preferencia/preferencia-edit/preferencia-edit.component';
import { InstrutorEditComponent } from './pages/instrutor/instrutor-edit/instrutor-edit.component';
import { AdminEditComponent } from './pages/admin/admin-edit/admin-edit.component';
import { AdminCreateComponent } from './pages/admin/admin-create/admin-create.component';
import { AdminListComponent } from './pages/admin/admin-list/admin-list.component';
import { InstrutorListComponent } from './pages/instrutor/instrutor-list/instrutor-list.component';
import { ClienteEditComponent } from './pages/cliente/cliente-edit/cliente-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ClienteComponent } from './pages/cliente/cliente-create/cliente.component';
import { ClienteListComponent } from './pages/cliente/cliente-list/cliente-list.component';
import { ExercicioComponent } from './pages/exercicio/exercicio-create/exercicio.component';
import { InstrutorComponent } from './pages/instrutor/instrutor-create/instrutor.component';
import { PreferenciaComponent } from './pages/preferencia/preferencia-create/preferencia.component';
import { LocalTreinamentoComponent } from './pages/local-treinamento/local-treinamento-create/local-treinamento.component';
import { LocalTreinamentoListComponent } from './pages/local-treinamento/local-treinamento-list/local-treinamento-list.component';
import { ExercicioListComponent } from './pages/exercicio/exercicio-list/exercicio-list.component';
import { PreferenciaListComponent } from './pages/preferencia/preferencia-list/preferencia-list.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminListComponent },
      { path: 'cadastro', component: AdminCreateComponent },
      { path: ':id/edit', component: AdminEditComponent },
    ],
  },
  {
    path: 'cliente',
    children: [
      { path: '', component: ClienteListComponent },
      { path: 'cadastro', component: ClienteComponent },
      { path: ':id/edit', component: ClienteEditComponent },
    ],
  },
  {
    path: 'instrutor',
    children: [
      { path: '', component: InstrutorListComponent },
      { path: 'cadastro', component: InstrutorComponent },
      { path: ':id/edit', component: InstrutorEditComponent },
    ],
  },
  {
    path: 'preferencia',
    children: [
      { path: '', component: PreferenciaListComponent },
      { path: 'cadastro', component: PreferenciaComponent },
      { path: ':id/edit', component: PreferenciaEditComponent },
    ],
  },
  {
    path: 'exercicio',
    children: [
      { path: '', component: ExercicioListComponent },
      { path: 'cadastro', component: ExercicioComponent },
      { path: ':id/edit', component: ExercicioEditComponent },
    ],
  },
  {
    path: 'localTreinamento',
    children: [
      { path: '', component: LocalTreinamentoListComponent },
      { path: 'cadastro', component: LocalTreinamentoComponent },
      { path: ':id/edit', component: LocalTreinamentoEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
