import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { HeaderComponent } from './header/header.component';
import { InformationComponent } from './information/information.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [RelatorioComponent, HeaderComponent, InformationComponent, FooterComponent],
  imports: [
    CommonModule,
    RelatorioRoutingModule
  ],
  exports: [RelatorioComponent]
})
export class RelatorioModule { }
