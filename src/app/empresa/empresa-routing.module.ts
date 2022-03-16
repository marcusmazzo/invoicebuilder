import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/authguard';
import { LayoutComponent } from '../layout/layout.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaComponent } from './empresa.component';

const routes: Routes = [
  {path: 'empresa', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: 'dados', component: EmpresaComponent, canActivate: [AuthGuard]}  
  ]},
  {path: 'register', component: EmpresaFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
