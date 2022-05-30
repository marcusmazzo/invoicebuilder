import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  
  
  baseUrl: String = environment.baseUrl;
  
  constructor(private http: HttpClient) {

   }

  findByToken() : Observable<Empresa> {
    return this.http.get<Empresa>(this.baseUrl+"/empresa/user");
  }

  saveLogin(empresa:Empresa) : Observable<Empresa> {
    if(empresa.country === "PT") {
      empresa.currencySymbol = "€";
    }
    if(empresa.country === "BR") {
      empresa.currencySymbol = "R$";
    }
    return this.http.post<Empresa>(this.baseUrl+"/empresa/salvar/login", empresa);
  }

  save(empresa:Empresa) : Observable<Empresa> {
    return this.http.post<Empresa>(this.baseUrl+"/empresa/salvar", empresa);
  }

  upload(files: FileList) : Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', files[0]);

    const req = this.http.post(this.baseUrl+"/empresa/logotipo", formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });

    return req;
  }

  saveInformation(htmlContent: String) : Observable<Empresa> {
    let empresa: Empresa = new Empresa()
    empresa.informacoes = htmlContent;
    return this.http.post<Empresa>(this.baseUrl+"/empresa/salvar-informacao", empresa);
  }

  saveRecibo(htmlContent: String) : Observable<Empresa> {
    let empresa: Empresa = new Empresa()
    empresa.textoRecibo = htmlContent;
    return this.http.post<Empresa>(this.baseUrl+"/empresa/salvar-recibo", empresa);
  }

 
}
