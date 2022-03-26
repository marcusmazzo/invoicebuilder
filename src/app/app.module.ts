import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmpresaService } from './services/empresa.service';
import { UsersService } from './services/users.service';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TemplateModule } from './template/template.module';
import { LayoutComponent } from './layout/layout.component';
import { EmpresaModule } from './empresa/empresa.module';
import { ClienteModule } from './cliente/cliente.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoModule } from './produto/produto.module';
import { AuthGuard } from './guards/authguard';
import { ClienteGuard } from './guards/clienteguard';
import { RelatorioModule } from './relatorio/relatorio.module';
import { CaixaModule } from './caixa/caixa.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TipoProdutoModule } from './tipo-produto/tipo-produto.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    EmpresaModule,
    ClienteModule,
    ProdutoModule,
    RelatorioModule,
    CaixaModule,
    TipoProdutoModule,
    TemplateModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    EmpresaService,
    UsersService,
    LoginService,
    AuthGuard,
    ClienteGuard,
    { provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


registerLocaleData(localePt); 
