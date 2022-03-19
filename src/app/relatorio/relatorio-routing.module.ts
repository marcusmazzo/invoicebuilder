import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';


const routes: Routes = [
  { path: 'relatorio/:id/:idCliente', component: RelatorioComponent},
  { path: 'relatorio/:id/:idCliente/:recibo', component: RelatorioComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
