import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';
import { VendasComponent } from './vendas/vendas.component';


const routes: Routes = [
  { path: 'relatorio/:id/:idCliente', component: RelatorioComponent},
  { path: 'relatorio/:id/:idCliente/:recibo', component: RelatorioComponent},
  { path: 'relatorio/vendas', component: VendasComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
