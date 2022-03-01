import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './datepicker-adapter';


@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [NgbdDatepickerPopupModule],
  exports: [NgbdDatepickerPopupModule],
  bootstrap: [NgbdDatepickerPopupModule],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class NgbdDatepickerPopupModule {}
