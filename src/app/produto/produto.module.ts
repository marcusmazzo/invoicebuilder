import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../datepicker/datepicker-adapter';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../tokeninterceptor';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
  declarations: [ProdutoComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    FormsModule,
    CurrencyMaskModule,
    NgbModule,
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: LOCALE_ID,useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE,useValue: ''},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ],
  exports: [ProdutoComponent]
})
export class ProdutoModule { }
