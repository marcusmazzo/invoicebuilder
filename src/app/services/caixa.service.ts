import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Documentos } from '../models/documentos';
import { Pagamento } from '../models/pagamento';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public findById(id: number) : Observable<Pagamento> {
    return this.http.get<Pagamento>(this.baseUrl+"/caixa/"+id);
  }

  public findAll() : Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.baseUrl+"/caixa");
  }

  public findAllByCliente(cliente: Cliente) : Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.baseUrl+"/caixa/cliente/"+cliente.id);
  }

  public findAllByPedido(pedido: Pedido) : Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.baseUrl+"/caixa/pedido/"+pedido.id);
  }

  public save(pagamento: Pagamento): Observable<Pagamento> {
    return this.http.post<Pagamento>(this.baseUrl+"/caixa", pagamento);
  }

  upload(pedido: Pedido, files: FileList) : Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    for(let i = 0; i < files.length; i++){
      formData.append('files', files[i]);
    }
    formData.append("pedido", pedido.id.toString());

    const req = this.http.post(this.baseUrl+"/file", formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });

    return req;
  }

  uploadImagem(pedido: Pedido, files: FileList) : Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    for(let i = 0; i < files.length; i++){
      formData.append('files', files[i]);
    }
    formData.append("pedido", pedido.id.toString());

    const req = this.http.post(this.baseUrl+"/file/imagem", formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });

    return req;
  }

  showDocumentos(pedido: Pedido): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(this.baseUrl+"/file/pedido/"+pedido.id);
  }

  showDocumentosImagem(pedido: Pedido): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(this.baseUrl+"/file/pedido/"+pedido.id+"/imagem");
  }

  finalizarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.get<Pedido>(this.baseUrl+"/pedido/finalizar/"+pedido.id);
  }

  findAllPedidosAberto(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl+"/pedido/aberto/");
  }

  findAllPedidosMes(mes: string, ano: string): Observable<Pedido[]> {
    let params = new HttpParams();
    params.set("mes", mes);
    params.set("ano", ano);

    return this.http.get<Pedido[]>(this.baseUrl+"/pedido/mensal/", {params: params});
  }

  findAllPedidosAno(ano: string): Observable<Pedido[]> {
    let params = new HttpParams();
    params.set("ano", ano);

    return this.http.get<Pedido[]>(this.baseUrl+"/pedido/anual/", {params: params});
  }

}
