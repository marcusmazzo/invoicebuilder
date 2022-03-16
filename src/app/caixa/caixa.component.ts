import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../models/cliente';
import { Pagamento } from '../models/pagamento';
import { Pedido } from '../models/pedido';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  pedidos: Pedido[];
  pedido: Pedido;
  dataPagamento: NgbDate;
  pagamento: Pagamento;
  pagamentos: Pagamento[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.findAllPedido().subscribe(response => this.pedidos = response);
    this.pagamento = new Pagamento();
    this.pagamentos = [];
    this.pedido = new Pedido();
    this.pedido.cliente = new Cliente();
    this.pedido.itens = []
    let now: Date = new Date();
    this.dataPagamento = new NgbDate(now.getFullYear(), now.getMonth()+1, now.getDate());
  }

  showPagamentos(pedido: Pedido) {
    this.pedido = pedido;
    this.pedido.valorTotalPago = 0;
  }

  salvar() {
    this.pagamento.dataPagamento = new Date(this.dataPagamento.year, this.dataPagamento.month-1, this.dataPagamento.day);
    this.pagamentos.push(JSON.parse(JSON.stringify(this.pagamento)));
    this.pedido.valorTotalPago = this.pedido.valorTotalPago + this.pagamento.valorRecebido;
    this.pagamento = new Pagamento();
    this.pagamento.pedido = new Pedido();
  }

}
