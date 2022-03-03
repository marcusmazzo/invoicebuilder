import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { FormsModule } from '@angular/forms';
import { ClienteComponent } from './cliente.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../tokeninterceptor';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../datepicker/datepicker-adapter';
import { ClienteViewComponent } from './cliente-view/cliente-view.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';


@NgModule({
  declarations: [ClienteComponent, ClienteViewComponent, ClienteFormComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    CurrencyMaskModule,
    NgbModule,
  ],
  exports: [
    ClienteComponent
    
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: LOCALE_ID,useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE,useValue: ''},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ]
})
export class ClienteModule { }
