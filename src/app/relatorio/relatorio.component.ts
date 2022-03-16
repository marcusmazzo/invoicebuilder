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

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  constructor(
    private clienteService: ClienteService, 
    private loginService: LoginService, 
    private sanitizer: DomSanitizer, 
    private routeParams: ActivatedRoute
    ) { }

  empresa: Empresa;
  contato: Empresa;
  pedido: Pedido;
  information: any = '';
  logotipo: SafeUrl;
  now: Date

  ngAfterViewInit() {
    setTimeout(() => {
      window.print();
    }, 50);
    setTimeout(() => {
      window.close();
    }, 500);
  }

  ngOnInit(): void {
    this.now = new Date();
    this.routeParams.params.subscribe(param => {
      let idPedido = parseInt(param['id'])
      let idCliente = parseInt(param['idCliente'])
      if(idPedido == null || idPedido == undefined || isNaN(idPedido)) {
        this.mock()
      } else {
        this.clienteService.findPedidoById(idPedido).subscribe(response => {
            this.pedido = response
            let cliente: Cliente = new Cliente();
            cliente.id = idCliente;
            this.clienteService.findById(cliente).subscribe(response => this.pedido.cliente = response);
            this.empresa = JSON.parse(this.loginService.getEmpresa());
            this.contato = JSON.parse(this.loginService.getEmpresa());

            let itensDescricao = "";
            this.pedido.itens.forEach(item => {
              itensDescricao += item.descricaoProduto+"<br />";
            })
            let informacao = (this.empresa.informacoes as string).replace("[[itens]]", itensDescricao);

            this.information = this.sanitizer.bypassSecurityTrustHtml(informacao);
            this.logotipo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+this.empresa.logotipoBase64 as string);
          })
        }
        
      }  
    );
        
    

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

}
