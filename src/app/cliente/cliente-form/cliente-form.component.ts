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
import { ToastrService } from 'ngx-toastr';

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
  

  constructor(private service: ClienteService, private produtoService: ProdutoService, private route: Router,  private toastr: ToastrService) { }

  ngOnInit(): void {
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
    this.validateAdd();
    this.item.produto = this.produto.descricao;
    this.item.descricaoProduto = this.produto.descricaoCompleta;
    this.item.garantia = this.produto.garantia;
    this.item.totalItem = this.item.valorVenda * this.item.quantidade;
    this.pedido.itens.push(this.item);
    this.pedido.valorTotal = this.pedido.valorTotal + this.item.totalItem;

    this.item = new Item();
    this.produto = new Produto();
    this.toastr.success("Item adicionado", "Sucesso");
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

    this.service.salvarPedido(this.pedido).subscribe( response =>
      this.route.navigate([rota]).then(_ => this.toastr.success("Pedido adicionado com sucesso", "Sucesso"))
      
      );
    }
    
    validateInput() {
    let erro = false;

    if(this.pedido.itens == null || this.pedido.itens.length == 0){
      this.toastr.error("É necessário adicionar ao menos um item ao pedido", "Erro");
      erro = true;
    }

    if(this.pedido.cliente == null || this.pedido.cliente == undefined || this.pedido.cliente.nome == null || this.pedido.cliente.nome == undefined){
      this.toastr.error("É necessário informar o nome do Cliente", "Erro");
      erro = true;
    }

    if(this.pedido.cliente == null || this.pedido.cliente == undefined || this.pedido.cliente.contato == null || this.pedido.cliente.contato == undefined){
      this.toastr.error("É necessário informar o contacto do Cliente", "Erro");
      erro = true;
    }
    
    if(this.pedido.cliente == null || this.pedido.cliente == undefined || this.pedido.cliente.endereco == null || this.pedido.cliente.endereco == undefined){
      this.toastr.error("É necessário informar o Endereço do Cliente", "Erro");
      erro = true;
    }

    if(erro)
      throw new Error();
  }

  validateAdd() {
    let erro = false;
    if(this.item.quantidade == null || this.item.quantidade == undefined || this.item.quantidade == NaN){
      this.toastr.error("É necessário informar a quantidade", "Erro");
      erro = true;
    }

    if(this.item.valorVenda == null || this.item.valorVenda == undefined || this.item.valorVenda == NaN){
      this.toastr.error("É necessário informar o valor unitário", "Erro");
      erro = true;
    }

    if(this.item.altura == null || this.item.altura == undefined || this.item.altura == NaN){
      this.toastr.error("É necessário informar a altura do produto", "Erro");
      erro = true;
    }

    if(this.item.largura == null || this.item.largura == undefined || this.item.largura == NaN){
      this.toastr.error("É necessário informar a largura do produto", "Erro");
      erro = true;
    }

    if(this.produto == null || this.produto.descricao == undefined){
      this.toastr.error("É necessário selecionar um Produto", "Erro");
      erro = true;
    }


    if(erro)
      throw new Error();
  }
}
