import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoProduto } from '../models/tipoProduto';

@Injectable({
  providedIn: 'root'
})
export class TipoProdutoService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<TipoProduto[]> {
    return this.http.get<TipoProduto[]>(this.baseUrl+"/tipo-produto")
  }

  public save(tipoProduto: TipoProduto): Observable<TipoProduto> {
    return this.http.post<TipoProduto>(this.baseUrl+"/tipo-produto", tipoProduto)
  }

}
