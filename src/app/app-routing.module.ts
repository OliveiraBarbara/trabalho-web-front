import { PreferenciaComponent } from './pages/preferencia/preferencia.component';
import { InstrutorComponent } from './pages/instrutor/instrutor.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExercicioComponent } from './pages/exercicio/exercicio.component';
import { LocalTreinamentoComponent } from './pages/local-treinamento/local-treinamento.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
    ],
  },
  { path: 'cadastro-cli', component: ClienteComponent },
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
