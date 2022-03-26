import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../models/produto';
import { TipoProduto } from '../models/tipoProduto';
import { ProdutoService } from '../services/produto.service';
import { TipoProdutoService } from '../services/tipo-produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  loading: boolean
  produto: Produto
  produtos: Produto[]
  tiposProduto: TipoProduto[]

  constructor(private service: ProdutoService, private toastr: ToastrService, private tipoProdutoService: TipoProdutoService) { }

  ngOnInit(): void {
    this.loading = true;
    this.produto = new Produto();
    this.produto.tipoProduto = new TipoProduto();
    this.tiposProduto = [];
    this.tipoProdutoService.findAll().subscribe(response => {
      this.tiposProduto.push(new TipoProduto())
      response.forEach(tipoProduto => {
        this.tiposProduto.push(tipoProduto)
      })
      
    });
    this.list();
  }

  list() {
    this.service.findAll().subscribe(response => {
      this.produtos = response;
      this.loading = false;
    })
  }

  prepareToUpdate(produto: Produto){
    this.produto = produto;
  }

  save() {
    this.validateInput();
    this.loading = true;

    this.produto.garantia = this.produto.garantia.replace("\n", "<br />");
    this.produto.descricaoCompleta = this.produto.descricao.replace("\n", "<br />");
    
    this.service.save(this.produto).subscribe(response => {
      this.ngOnInit()
      this.toastr.success("Produto Salvo com sucesso.", "Sucesso");
    });
  }

  validateInput(){
    let erro = false;

    if(this.produto == null || this.produto.descricao == null || this.produto.descricao == undefined) {
      this.toastr.error("É preciso informar um Produto.", "Erro");
      erro = true;
    }

    if(this.produto == null || this.produto.descricaoCompleta == null || this.produto.descricaoCompleta == undefined) {
      this.toastr.error("É preciso informar uma descrição para o produto.", "Erro");
      erro = true;
    }

    if(this.produto == null || this.produto.garantia == null || this.produto.garantia == undefined) {
      this.toastr.error("É preciso informar uma garantia para o produto.", "Erro");
      erro = true;
    }

    if(this.produto == null || this.produto.tipoProduto.descricao == null || this.produto.tipoProduto.descricao == undefined) {
      this.toastr.error("É preciso informar um tipo de produto.", "Erro");
      erro = true;
    }

    if(this.produto == null || this.produto.custoMedio == null || this.produto.custoMedio == undefined || this.produto.custoMedio == NaN) {
      this.toastr.error("É preciso informar custo médio para o produto.", "Erro");
      erro = true;
    }

    if(erro)
      throw new Error()
  }

}
