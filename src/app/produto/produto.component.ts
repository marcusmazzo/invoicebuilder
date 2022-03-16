import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  loading: boolean
  produto: Produto
  produtos: Produto[]
  tiposProduto: String[] = ["JANELA", "PORTA"]

  constructor(private service: ProdutoService) { }

  ngOnInit(): void {
    this.loading = true;
    this.produto = new Produto();
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
    this.loading = true;
    this.service.save(this.produto).subscribe(response => this.ngOnInit());
  }

}
