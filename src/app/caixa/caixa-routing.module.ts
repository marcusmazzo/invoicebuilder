import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/authguard';
import { LayoutComponent } from '../layout/layout.component';
import { CaixaComponent } from './caixa.component';

const routes: Routes = [
  {path: 'caixa', component: LayoutComponent, children: [
    {path: '', component: CaixaComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaixaRoutingModule { }
