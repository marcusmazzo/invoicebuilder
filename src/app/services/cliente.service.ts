import { EventEmitter, Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  cliente: Cliente;

  setCliente(cliente: Cliente){
    this.cliente = cliente;
  }

  getCliente(): Cliente {
    return this.cliente;
  }


}
