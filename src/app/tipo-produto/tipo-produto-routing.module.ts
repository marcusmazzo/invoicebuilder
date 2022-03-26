import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/authguard';
import { LayoutComponent } from '../layout/layout.component';
import { TipoProdutoComponent } from './tipo-produto.component';

const routes: Routes = [
  {path: 'tipoProduto', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: '', component: TipoProdutoComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProdutoRoutingModule { }
