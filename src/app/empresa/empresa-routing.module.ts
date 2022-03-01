import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaComponent } from './empresa.component';

const routes: Routes = [
  {path: 'empresa', component: LayoutComponent, children: [
    {path: 'dados', component: EmpresaComponent}  
  ]},
  {path: 'register', component: EmpresaFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
