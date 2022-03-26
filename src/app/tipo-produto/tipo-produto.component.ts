import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TipoProduto } from '../models/tipoProduto';
import { TipoProdutoService } from '../services/tipo-produto.service';

@Component({
  selector: 'app-tipo-produto',
  templateUrl: './tipo-produto.component.html',
  styleUrls: ['./tipo-produto.component.css']
})
export class TipoProdutoComponent implements OnInit {

  tipoProduto: TipoProduto;
  tipoProdutos: TipoProduto[];
  loading: Boolean

  constructor(private service: TipoProdutoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.tipoProduto = new TipoProduto();
    this.loading = true;
    this.list();
  }

  list() {
    this.service.findAll().subscribe(response => {
      this.tipoProdutos = response
      this.loading = false;
    });
  }

  prepareToUpdate(tipoProduto: TipoProduto){
    this.tipoProduto = tipoProduto;
  }

  save(){
    this.validateInput();
    this.loading = true;
    this.service.save(this.tipoProduto).subscribe(response => {
      this.ngOnInit()
      this.toastr.success("Salvo com sucesso", "Sucesso")
    });
  }

  validateInput() {
    let erro = false;

    if(this.tipoProduto == null ){
      this.toastr.error("Tipo produto nulo", "Erro");
      erro = true;
    }

    if(this.tipoProduto.descricao == null || this.tipoProduto.descricao == undefined){
      this.toastr.error("É preciso informar uma Descrição", "Erro");
      erro = true;
    }

    if(erro) {
      throw new Error();
    }

  }

}
