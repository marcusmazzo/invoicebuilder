import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/models/pedido';
import { CaixaService } from 'src/app/services/caixa.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  abertos: Pedido[];
  mensal: Pedido[];
  anual: Pedido[];
  meses: String[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  mes: String = "";
  ano: number;

  constructor(private service: CaixaService) { }

  ngOnInit(): void {
    let date: Date = new Date();
    this.mes = this.selectMonthString(date.getMonth());
    this.ano = date.getFullYear();
    this.list();
  }

  list() {
    this.service.findAllPedidosAberto().subscribe(response => this.abertos = response);
    this.service.findAllPedidosMes(this.mes as string, new String(this.ano) as string).subscribe(response => this.mensal = response);
    this.service.findAllPedidosAno(new String(this.ano) as string).subscribe(response => this.anual = response);
  }

  selectMonthNumber(): number{
    let month = null;
    switch (this.mes) {
      case "Janeiro":
        month = 0;
        break;
      case "Fevereiro":
        month = 1;
        break;
      case "Março":
        month = 2;
        break;  
      case "Abril":
        month = 3;
        break;
      case "Maio":
        month = 4;
        break;
      case "Junho":
        month = 5;
        break;
      case "Julho":
        month = 6;
        break;
      case "Agosto":
        month = 7;
        break;
      case "Setembro":
        month = 8;
        break;
      case "Outubro":
        month = 9;
        break;
      case "Novembro":
        month = 10;
        break;
      case "Dezembro":
        month = 11;
        break;
      default:
        break;
    }
    return month;
  }

  selectMonthString(mes: number): String{
    let month = null;
    switch (mes) {
      case  1 :
        month = "Janeiro";
        break;
      case 2:
        month = "Fevereiro";
        break;
      case 3:
        month = "Março";
        break;  
      case 4:
        month = "Abril";
        break;
      case 5:
        month = "Maio";
        break;
      case 6:
        month = "Junho";
        break;
      case 7:
        month = "Julho";
        break;
      case 8:
        month = "Agosto";
        break;
      case 9:
        month = "Setembro";
        break;
      case 10:
        month = "Outubro";
        break;
      case 11:
        month = "Novembro";
        break;
      case 12:
        month = "Dezembro";
        break;
      default:
        break;
    }
    return month;
  }
  

}
