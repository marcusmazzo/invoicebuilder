import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { Item } from '../models/item';
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
    this.clientes.push(this.createCliente());
    this.clientes.push(this.createCliente());
    this.clientes.push(this.createCliente());
  }

  changeCliente(cliente: Cliente){
    this.cliente = cliente;
    this.cliente.expanded = !cliente.expanded;
  }

  createCliente() : Cliente {
    let cliente: Cliente = new Cliente
    let pedido = new Pedido()
    let item: Item = new Item();
    let item1: Item = new Item();
    
    cliente.pedidos = []
    pedido.itensPedido = []

    cliente.nome = "Marcus";
    cliente.endereco = "Avenida da Liberdade"
    
    pedido.numeroPedido = "123"
    pedido.dataPedido = new Date
    pedido.status = "Aguadando Material"
    pedido.valorTotal = 1500

    item.custo = 35
    item.quantidade = 10
    item.valorUnitario = 50
    item.custoTotal = item.custo*item.quantidade;
    item.valorTotal = item.valorUnitario*item.quantidade;
    item.produto = "Janela duas Folhas"

    item1.custo = 250
    item1.quantidade = 1
    item1.valorUnitario = 1000
    item1.custoTotal = item1.custo*item1.quantidade;
    item1.valorTotal = item1.valorUnitario*item1.quantidade;
    item1.produto = "Porta duas Folhas"

    pedido.itensPedido.push(item);
    pedido.itensPedido.push(item1);
    cliente.pedidos.push(pedido);
    
    return cliente;
  }

  view(cliente: Cliente){
    this.service.setCliente(cliente);
    this.route.navigate(['cliente/view']).then(_ => null);
  }

}
