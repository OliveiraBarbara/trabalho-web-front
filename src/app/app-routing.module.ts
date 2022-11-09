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
    ],
  },
  {
    path: 'preferencia',
    children: [
      { path: '', component: PreferenciaListComponent },
      { path: 'cadastro', component: PreferenciaComponent },
    ],
  },

  {
    path: 'exercicio',
    children: [
      { path: '', component: ExercicioListComponent },
      { path: 'cadastro', component: ExercicioComponent },
    ],
  },

  {
    path: 'localTreinamento',
    children: [
      { path: '', component: LocalTreinamentoListComponent },
      { path: 'cadastro', component: LocalTreinamentoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
