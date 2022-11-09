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

const routes: Routes = [
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
    ],
  },
  { path: 'cadastro-cli', component: ClienteComponent },
  { path: 'lista-cli', component: ClienteListComponent },
  { path: 'cadastro-instrutor', component: InstrutorComponent },
  { path: 'preferencia', component: PreferenciaComponent },
  { path: 'exercicio', component: ExercicioComponent },
  { path: 'local', component: LocalTreinamentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
