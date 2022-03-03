import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  
  constructor(private http: HttpClient) {

   }

   findByToken() : Observable<Empresa> {
      return this.http.get<Empresa>("http://localhost:8090/invoice/empresa/user");
    }

  save(empresa:Empresa) : Observable<Empresa> {
    return this.http.post<Empresa>("http://localhost:8090/invoice/empresa/salvar", empresa);
  }

  upload(files: FileList) : Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', files[0]);

    const req = this.http.post("http://localhost:8090/invoice/empresa/logotipo", formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });

    return req;
  }

  saveInformation(htmlContent: String) : Observable<Empresa> {
    let empresa: Empresa = new Empresa()
    empresa.informacoes = htmlContent;
    return this.http.post<Empresa>("http://192.168.1.69:8090/invoice/empresa/salvar-informacao", empresa);
  }

 
}
