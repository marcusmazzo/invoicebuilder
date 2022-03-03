import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { 
    this.clientes = []
  }

  cliente: Cliente;
  clientes: Cliente[];

  setCliente(cliente: Cliente){
    this.cliente = cliente;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }

  findAll(): Observable<Cliente[]> {
    return new Observable(observer => observer.next(this.clientes)); 
  }

  save(cliente: Cliente) : Observable<Cliente>{
    this.clientes.push(cliente);
    return new Observable(observer => observer.next(cliente));
  }

}
