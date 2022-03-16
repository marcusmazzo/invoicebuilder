import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/authguard';
import { LayoutComponent } from '../layout/layout.component';
import { ProdutoComponent } from './produto.component';

const routes: Routes = [
  {path: 'produto', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: '', component: ProdutoComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
