import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/authguard';
import { ClienteGuard } from '../guards/clienteguard';
import { LayoutComponent } from '../layout/layout.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteViewComponent } from './cliente-view/cliente-view.component';
import { ClienteVisitaComponent } from './cliente-visita/cliente-visita.component';
import { ClienteComponent } from './cliente.component';

const routes: Routes = [
  {path: 'cliente', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: '', component: ClienteComponent, canActivate: [AuthGuard]},
    {path: 'view', component: ClienteViewComponent, canActivate: [AuthGuard, ClienteGuard]},
    {path: 'new', component: ClienteFormComponent, canActivate: [AuthGuard]},
    {path: 'visita', component: ClienteVisitaComponent, canActivate: [AuthGuard]}
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
