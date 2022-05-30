import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models/empresa';
import { Item } from '../models/item';
import { Pedido } from '../models/pedido';
import { Produto } from '../models/produto';
import { ClienteService } from '../services/cliente.service';
import { LoginService } from '../services/login.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Cliente } from '../models/cliente';
import { ActivatedRoute } from '@angular/router';
import { CaixaService } from '../services/caixa.service';
import { Pagamento } from '../models/pagamento';
import extenso from 'node_modules/extenso/dist/extenso'
import { Documentos } from '../models/documentos';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  constructor(
    private clienteService: ClienteService, 
    private loginService: LoginService, 
    private caixaService: CaixaService,
    private sanitizer: DomSanitizer, 
    private routeParams: ActivatedRoute
    ) { }

  empresa: Empresa;
  contato: Empresa;
  pedido: Pedido;
  information: any = '';
  logotipo: SafeUrl;
  now: Date
  orcamento: boolean
  recibo: any = ''
  documentos: Documentos[]

  ngOnInit(): void {
    this.now = new Date();
    this.empresa = JSON.parse(this.loginService.getEmpresa());
    this.contato = JSON.parse(this.loginService.getEmpresa());
    this.logotipo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+this.empresa.logotipoBase64 as string);
    
    this.routeParams.params.subscribe(param => {
      this.orcamento = param['recibo'] === undefined  ? true : false;
      let idPedido = parseInt(param['id'])

      if(idPedido == null || idPedido == undefined || isNaN(idPedido)) {
        this.mock()
      } else {
        if(this.orcamento) {
          this.clienteService.findPedidoById(idPedido).subscribe(response => {
            this.pedido = response
            let cliente: Cliente = new Cliente();
            cliente.id = parseInt(param['idCliente']);
            this.clienteService.findById(cliente).subscribe(response => 
            {
                this.pedido.cliente = response
                let itensDescricao = "";
                let garantias = "<ul>";
                this.pedido.itens.forEach(item => {
                  itensDescricao += item.descricaoProduto+"<br />";
                  garantias += "<li>"+item.garantia+"</li>";
                })
                garantias += "</ul>"
                
                
                let images = "<table>"
                let index = 1;
                this.pedido.imagens.forEach(imagem => {
                  if(index == 4) {
                    images += "</tr>"
                    index = 1;
                  }
                  if(index == 1) {
                    images +="<tr>"
                  }
                  images += "<td style=\"padding-right: 5px; padding-bottom: 5px\"> <img src=\"data:image/*;base64,"+imagem.contratoBase64+"\" width=\"300\" height=\"300\" /></td>";
                  index++;
                })
                images += "</tr>";
                
                if(garantias.length > 1000) {
                  let value = "<div class='page-break text-justify' style='page-break-after:always; text-align: justify; text-justify: inter-word;'>";
                  let index = 0;
                  for(let i=0; i < garantias.length; i++){
                    value += garantias.charAt(i);
                    index++;

                    if(index > 1930 && garantias.charAt(i) === " "){
                      value += "</div><br /><br /><br /><br /><br /><br /><div class='page-break' style='page-break-after:always; text-align: justify; text-justify: inter-word;'>"
                      index = 0;
                    }
                  }
                  garantias = value+garantias.slice(value.length+1)+"</div><br /><br /><br /><br /><br /><br />";
                }
                
                
                let informacao = (this.empresa.informacoes as string).replace("[[itens]]", itensDescricao).replace("[[garantias]]", garantias).replace("[[images]]", images);
                
                this.information = this.sanitizer.bypassSecurityTrustHtml(informacao);

                this.print();
             });
            
          })
        } else {
          this.caixaService.findById(idPedido).subscribe(response => {
            let pagamento: Pagamento = response;
            this.clienteService.findPedidoById(pagamento.pedidoPagamento).subscribe(pedido => {
              this.pedido = pedido;
              this.pedido.numeroRecibo = pagamento.numeroPagamento as string;
              this.pedido.dataPedido = pagamento.dataPagamento;
              this.pedido.cliente = pagamento.cliente;
              let valor = new String(pagamento.valorRecebido).replace(",","").replace(".", ",") as string;
              
              if(valor.charAt(valor.length-2) === "," ){
                valor = valor+"0";
              }

              let country: String = "EUR"
              if(this.pedido.cliente.empresa.country === 'BR') {
                country = "BRL";
              }

              let texto = (this.empresa.textoRecibo as string)
                .replace("[[cliente]]", this.pedido.cliente.nome as string)
                .replace("[[valor-pagamento]]", this.pedido.cliente.empresa.currencySymbol+ valor as string)
                .replace("[[valor-extenso]]", extenso(valor, { mode: 'currency', currency: { type: country } }))
                .replace("[[pedido]]", this.pedido.numeroPedido as string)
              this.recibo = this.sanitizer.bypassSecurityTrustHtml(texto);
              this.print();
            });
          })
        }
      }  
    });
  }

  mock() { 
    console.log("mock");
    
    this.pedido = new Pedido();
    this.pedido.cliente = new Cliente();
    this.pedido.cliente.nome = "Cliente Teste";
    this.pedido.cliente.endereco = "Endereço Teste"

    this.pedido.numeroPedido = new String("1/"+new Date().getFullYear().toString());
    let item: Item = new Item();
    let produto: Produto = new Produto();
    produto.descricao = "Janela"

    item.altura = 0.90;
    item.largura = 0.90;
    item.produto = produto.descricao;
    item.quantidade = 1;
    item.valorVenda = 10;
    item.totalItem = 100;

    this.pedido.itens = []
    this.pedido.itens.push(item);
    this.pedido.valorTotalPedido = 100;
    this.pedido.valorTotalIva = this.pedido.valorTotalPedido * (1+(this.empresa.percentualIva/100));
  }

  print() {
    setTimeout(() => {
      window.print();
    }, 10);
    setTimeout(() => {
      window.close();
    }, 10);
  }

}
