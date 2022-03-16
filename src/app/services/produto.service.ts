import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { 
  }

  findAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl+"/produto");
  }

  save(produto: Produto) : Observable<Produto>{
    return this.http.post<Produto>(this.baseUrl+"/produto", produto);
  }

}
