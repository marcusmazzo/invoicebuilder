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
import { ProdutoService } from 'src/app/services/produto.service';
import { Message } from 'src/app/models/message';

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
  messages: Message[];

  constructor(private service: ClienteService, private produtoService: ProdutoService, private route: Router) { }

  ngOnInit(): void {
    this.messages = [];
    this.loading = true;

    if(this.service.getIsNew()) {
      this.cliente = new Cliente();
      this.cliente.pedidos = []
    } else {
      this.cliente = this.service.getCliente();
    }

    this.pedido = new Pedido();
    this.pedido.cliente = this.cliente;
    this.pedido.valorTotal = 0;
    this.pedido.itens = [];

    this.item = new Item();
    this.produto = new Produto();

    this.produtoService.findAll().subscribe(response => {
      this.produtos = response
      this.loading = false;
      }
    );
  }

  ngAfterViewInit() {
    $('#date').mask('99/99/9999');
  }

  onChange(event){
    this.item.custoFabricacao = event.custoMedio;
    
  }

  adicionarItem(){
    this.item.produto = this.produto.descricao;
    this.item.descricaoProduto = this.produto.descricaoCompleta;
    this.item.totalItem = this.item.valorVenda * this.item.quantidade;
    this.pedido.itens.push(this.item);
    this.pedido.valorTotal = this.pedido.valorTotal + this.item.totalItem;

    this.item = new Item();
    this.produto = new Produto();
  }

  save(){

    this.validateInput();

    let rota: String = "cliente";
    if(this.cliente.id != null){
      rota = "cliente/view"
    }

    if(this.dataPedido == null) {
     this.pedido.dataPedido = new Date();
    } else {
      this.pedido.dataPedido = new Date(this.dataPedido.month + "-" + this.dataPedido.day + "-"+this.dataPedido.year);
    }

    console.log(this.pedido);
    

    this.service.salvarPedido(this.pedido).subscribe( response =>
      this.route.navigate([rota]).then(_ => null)
    );
  }

  validateInput() {
    if(this.pedido.itens == null || this.pedido.itens.length == 0){
      let message = new Message();
      message = new Message();
      message.message = "É necessário adicionar ao menos um item ao pedido";
      message.typeError = true;
      this.messages.push(message);
    }

    if(this.pedido.cliente == null || this.pedido.cliente == undefined || this.pedido.cliente.nome == null || this.pedido.cliente.nome == undefined){
      let message = new Message();
      message = new Message();
      message.message = "É necessário informar o nome do Cliente";
      message.typeError = true;
      this.messages.push(message);
    }

    if(this.pedido.cliente == null || this.pedido.cliente == undefined || this.pedido.cliente.contato == null || this.pedido.cliente.contato == undefined){
      let message = new Message();
      message = new Message();
      message.message = "É necessário informar o contacto do Cliente";
      message.typeError = true;
      this.messages.push(message);
    }
    
    if(this.pedido.cliente == null || this.pedido.cliente == undefined || this.pedido.cliente.endereco == null || this.pedido.cliente.endereco == undefined){
      let message = new Message();
      message = new Message();
      message.message = "É necessário informar o Endereço do Cliente";
      message.typeError = true;
      this.messages.push(message);
    }

    if(this.messages.length > 0) {
      throw new Error();
    }
  }
}
