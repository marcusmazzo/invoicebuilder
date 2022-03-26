import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProdutoRoutingModule } from './tipo-produto-routing.module';
import { TipoProdutoComponent } from './tipo-produto.component';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../tokeninterceptor';
import { NgbDateCustomParserFormatter } from '../datepicker/datepicker-adapter';


@NgModule({
  declarations: [TipoProdutoComponent],
  imports: [
    CommonModule,
    TipoProdutoRoutingModule,
    FormsModule,
    CurrencyMaskModule,
    NgbModule
  ], 
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: LOCALE_ID,useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE,useValue: ''},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ],
  exports: [TipoProdutoComponent]
})
export class TipoProdutoModule { }
