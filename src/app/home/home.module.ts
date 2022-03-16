import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../tokeninterceptor';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../datepicker/datepicker-adapter';
import { ClienteVisitaComponent } from '../cliente/cliente-visita/cliente-visita.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent, ClienteVisitaComponent],
  imports: [
    CommonModule, 
    NgbModule,
    CurrencyMaskModule,
    FormsModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: LOCALE_ID,useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE,useValue: ''},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ]
  
})
export class HomeModule { }
