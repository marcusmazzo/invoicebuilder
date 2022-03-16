import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Visita } from '../models/visita';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { 
  }

  cliente: Cliente;
  pedido: Pedido;
  isNew: boolean;
  
  
  setCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  setPedido(pedido: Pedido){
    this.pedido = pedido;
  }

  getPedido() : Pedido {
    return this.pedido;
  }

  setIsNew(isNew: boolean){
    this.isNew = isNew;
  }

  getIsNew() : boolean {
    return this.isNew;
  }

 
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl+"/cliente");
  }

  findById(cliente: Cliente): Observable<Cliente> {
    return this.http.get<Cliente>(this.baseUrl+"/cliente/"+cliente.id);
  }

  save(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.baseUrl+"/cliente/salvar", cliente);
  }

  findByTelefone(telemovel: String): Observable<Cliente>{
    return this.http.get<Cliente>(this.baseUrl+"/cliente/contato/"+telemovel)
  }

  saveAgendamento(visita: Visita){
    return this.http.post<Visita>(this.baseUrl+"/visita/save", visita);
  }

  findVisita(visita: Visita) : Observable<Visita> {
    return this.http.get<Visita>(this.baseUrl+"/visita/"+visita.id);
  }

  findVisitas() : Observable<Visita[]> {
    return this.http.get<Visita[]>(this.baseUrl+"/visita");
  }

  findVisitasAgendado() : Observable<Visita[]> {
    return this.http.get<Visita[]>(this.baseUrl+"/visita/agendado");
  }

  findVisitasCancelado() : Observable<Visita[]> {
    return this.http.get<Visita[]>(this.baseUrl+"/visita/cancelado");
  }

  findVisitasVisitado() : Observable<Visita[]> {
    return this.http.get<Visita[]>(this.baseUrl+"/visita/visitado");
  }

  findVisitasByCliente(cliente: Cliente) : Observable<Visita[]> {
    return this.http.get<Visita[]>(this.baseUrl+"/visita/cliente/"+cliente.id);
  }

  cancelarVisita(visita: Visita): Observable<Visita> {
    return this.http.get<Visita>(this.baseUrl+"/visita/cancelar/"+visita.id);
  }

  confirmarVisita(visita: Visita): Observable<Visita> {
    return this.http.get<Visita>(this.baseUrl+"/visita/confirmar/"+visita.id);
  }

  salvarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl+"/pedido/salvar", pedido);
  }

  findPedidoById(id: number): Observable<Pedido>{
    return this.http.get<Pedido>(this.baseUrl+"/pedido/"+id);
  }

  findAllPedidoByClienteId(id: number): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+"/pedido/cliente/"+id);
  }

  findAllPedido(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+"/pedido");
  }

}
