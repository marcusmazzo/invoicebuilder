import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/cliente';
import $ from "jquery";
import 'jquery-mask-plugin';
import { Pedido } from 'src/app/models/pedido';
import { Produto } from 'src/app/models/produto';
import { Item } from 'src/app/models/item';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente;
  pedido: Pedido;
  loading: boolean;
  dataPedido: NgbDate;
  produtos: Produto[];
  produto: Produto;
  item: Item;

  constructor(private service: ClienteService, private route: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.cliente = new Cliente();
    this.pedido = new Pedido();
    this.pedido.valorTotal = 0;
    this.item = new Item();
    this.produto = new Produto();
    this.produtos = [];

    this.cliente.pedidos = []
    this.pedido.itensPedido = [];

    this.loading = false;
    this.createItens();
  }

  ngAfterViewInit() {
    $('#date').mask('99/99/9999');
  }

  onChange(event){
    this.item.custoFabricacao = event.custoMedio;
    
  }

  adicionarItem(){
    this.item.produto = this.produto.descricao;
    this.item.totalItem = this.item.valorVenda * this.item.quantidade;
    this.pedido.itensPedido.push(this.item);
    this.pedido.valorTotal = this.pedido.valorTotal + this.item.totalItem;

    this.item = new Item();
    this.produto = new Produto();
  }

  save(){
    if(this.dataPedido == null) {
      this.dataPedido = new NgbDate(1980, 1, 1);
    }
    this.pedido.dataPedido = new Date(this.dataPedido.day + "-" + this.dataPedido.month + "-"+this.dataPedido.year);
    this.pedido.numeroPedido = "1/2022";
    this.pedido.status = "NOVO"
    this.cliente.pedidos.push(this.pedido);
    this.service.save(this.cliente);
    this.route.navigate(['cliente']).then(_ => null);
  }

  createItens(){
    let produto: Produto = new Produto();
    produto.descricao = "Janela Dupla folha";
    produto.custoMedio = 35

    let produto1: Produto = new Produto();
    produto1.descricao = "Porta Dupla folha";
    produto1.custoMedio = 85;
    
    
    this.produtos.push(produto);
    this.produtos.push(produto1);
  }

}
