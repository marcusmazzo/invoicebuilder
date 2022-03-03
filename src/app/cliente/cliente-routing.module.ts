import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteViewComponent } from './cliente-view/cliente-view.component';
import { ClienteComponent } from './cliente.component';

const routes: Routes = [
  {path: 'cliente', component: LayoutComponent, children: [
    {path: '', component: ClienteComponent},
    {path: 'view', component: ClienteViewComponent},
    {path: 'new', component: ClienteFormComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
