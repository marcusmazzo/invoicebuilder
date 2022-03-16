import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { Pedido } from '../models/pedido';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[]
  cliente: Cliente;
  pedido: Pedido;

  constructor(private service: ClienteService, private route: Router) { }

  ngOnInit(): void {
    this.clientes = []
    this.cliente = new Cliente();
    this.cliente.pedidos = []
  }

  search() {
    this.service.findAll().subscribe(response => this.clientes = response);
  }

  changeCliente(cliente: Cliente){
    this.cliente = cliente;
    this.cliente.expanded = !cliente.expanded;
  }

  view(cliente: Cliente){
    this.service.setCliente(cliente);
    this.route.navigate(['cliente/view']).then(_ => null);
  }

  new() {
    this.service.setIsNew(true);
    this.route.navigate(['cliente/new']).then(_ => null);
  }
}
