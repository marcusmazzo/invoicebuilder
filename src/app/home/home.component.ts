import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Pagamento } from '../models/pagamento';
import { Pedido } from '../models/pedido';
import { Visita } from '../models/visita';
import { CaixaService } from '../services/caixa.service';
import { ClienteService } from '../services/cliente.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: boolean;
  visitas: Visita[]
  pedidos: Pedido[]
  visita: Visita;
  nonModalVisita: boolean
  searchedVisita: boolean;
  listar: boolean;
  dataVisita: NgbDate;
  pagamentos: Pagamento[];


  constructor(private clienteService: ClienteService, private caixaService: CaixaService) { }

  

  ngOnInit(): void {
    this.loading = true;
    this.loading = false;
    this.list();
  }

  list() {
    this.clienteService.findVisitasAgendado().subscribe(response => this.visitas = response);
    this.clienteService.findAllPedido().subscribe(response => this.pedidos = response);
    this.caixaService.findAll().subscribe(response => {
      console.log(response);
      
      this.pagamentos = response
    });
  }

  showVisita(visita: Visita){
    this.visita = JSON.parse(JSON.stringify(visita));
    this.nonModalVisita = false;
    this.searchedVisita = true;
    this.listar = false;
    this.dataVisita = new NgbDate(Number(visita.dataVisita.toString().slice(0, 4)), Number(visita.dataVisita.toString().slice(5, 7)), Number(visita.dataVisita.toString().slice(8, 10)));
  }

  cancelarVisita(visita: Visita){
    this.clienteService.cancelarVisita(visita);
  }

  confirmarVisita(visita: Visita){
    this.clienteService.confirmarVisita(visita);
  }

}
