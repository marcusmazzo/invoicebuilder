import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../models/cliente';
import { Documentos } from '../models/documentos';
import { Pagamento } from '../models/pagamento';
import { Pedido } from '../models/pedido';
import { CaixaService } from '../services/caixa.service';
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
  documentos: Documentos[]
  images: Documentos[]
  message: String;
  erro: Boolean;
  totalPedido: number
  files: FileList;

  constructor(private clienteService: ClienteService, private service: CaixaService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.erro = false;
    this.clienteService.findAllPedido().subscribe(response => {
      this.pedidos = response
    });
    this.pagamento = new Pagamento();
    this.pagamentos = [];
    this.pedido = new Pedido();
    this.pedido.cliente = new Cliente();
    this.pedido.cliente.empresa = JSON.parse(localStorage.getItem("empresa"));      

    this.pedido.itens = []
    let now: Date = new Date();
    this.dataPagamento = new NgbDate(now.getFullYear(), now.getMonth()+1, now.getDate());
  }

  showPagamentos(pedido: Pedido) {
    this.erro = false;
    this.pagamentos = [];
    this.pagamento = new Pagamento();
    this.pagamento.cliente = new Cliente();
    this.pagamento.pedido = new Pedido();
    this.pedido = pedido;
    this.pedido.valorTotalPago = 0;
    this.totalPedido = this.pedido.valorTotalPedido;
    this.service.findAllByPedido(this.pedido).subscribe(response => {
      this.pagamentos = response;
      this.pagamentos.forEach(pag => {this.pedido.valorTotalPago = this.pedido.valorTotalPago + pag.valorRecebido})
    });
  }

  salvar() {

    if(this.pagamento.valorRecebido == null || this.pagamento.valorRecebido == undefined || this.pagamento.valorRecebido == NaN){
      this.toastr.error("É preciso informar o valor do pagamento.", "Erro");
      throw new Error();
    }

    this.pagamento.cliente = this.pedido.cliente;
    this.pagamento.pedido = this.pedido;
    this.pagamento.dataPagamento = new Date(this.dataPagamento.year, this.dataPagamento.month-1, this.dataPagamento.day);
    this.service.save(this.pagamento).subscribe ( response => { 
      this.showPagamentos(this.pagamento.pedido)
      this.toastr.success("Pagamento adicionado com sucesso.", "Sucesso");
    });
  }

  cancelarPedido(pedido: Pedido) {

  }

  prepareUpload(files: FileList){
    this.files = files;
  }

  upload() {
    if(this.files == null || this.files.length == 0){
      this.toastr.error("É preciso escolher um ficheiro para ser carregado.", "Erro");
      throw new Error()
    }

    this.service.upload(this.pedido, this.files).subscribe(
      event => {
          this.showDocumentos();
          this.toastr.success("Ficheiro carregado com sucesso.", "Sucesso");
      }
    );
  }

  uploadImagem() {
    if(this.files == null || this.files.length == 0){
      this.toastr.error("É preciso escolher um ficheiro para ser carregado.", "Erro");
      throw new Error()
    }

    this.service.uploadImagem(this.pedido, this.files).subscribe(
      event => {
          this.showDocumentosImagem();
          this.toastr.success("Ficheiro carregado com sucesso.", "Sucesso");
      }
    );
  }

  showDocumentos() {
    this.service.showDocumentos(this.pedido).subscribe(
      response => {
        this.documentos = response;
      }
    )
  }

  showDocumentosImagem() {
    this.service.showDocumentosImagem(this.pedido).subscribe(
      response => {
        this.images = response;
      }
    )
  }

  downloadContrato(documento: Documentos){
    const source = `data:application/pdf;base64,${documento.contratoBase64}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = documento.nomeDocumento;
    link.click();
  }

  download(id: number) {
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['/relatorio', id, this.pedido.cliente.id])
    );
    window.open(url, "_blank");
  }

  downloadRecibo(id: number) {
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['/relatorio', id, this.pedido.cliente.id, 'r'])
    );
    window.open(url, "_blank");
  }

  pagamentoComIva() {
    this.pedido.pagamentoComIva = !this.pedido.pagamentoComIva;
    this.clienteService.updatePedido(this.pedido).subscribe(response => this.showPagamentos(response));
  }

  finalizarPedido() {
    this.service.finalizarPedido(this.pedido).subscribe(
        response => {
          this.showPagamentos(response)
          this.toastr.success("Pedido Finalizado.", "Sucesso");
        }, err => {
         this.toastr.error(err.error.message, 'Erro ao Finalizar');
        });
  }


}
