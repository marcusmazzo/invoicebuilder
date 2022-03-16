import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { UsersModule } from '../users/users.module';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from '../tokeninterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmpresaComponent } from './empresa.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [EmpresaFormComponent, EmpresaComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    UsersModule,
    FormsModule,
    CurrencyMaskModule,
    CKEditorModule 
  ],
  exports: [
    EmpresaFormComponent
    
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})
export class EmpresaModule { }
