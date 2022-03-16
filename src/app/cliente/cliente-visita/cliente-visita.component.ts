import { Visita } from 'src/app/models/visita';
import 'jquery-mask-plugin';
import { Component, Input, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/cliente';
import $ from "jquery";
import 'jquery-mask-plugin';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-visita',
  templateUrl: './cliente-visita.component.html',
  styleUrls: ['./cliente-visita.component.css']
})
export class ClienteVisitaComponent implements OnInit {


  @Input () visita: Visita
  @Input() dataAgendamento: NgbDate
  @Input() searched: boolean;
  @Input() nonModal: boolean;
  @Input() listar: boolean;
  
  visitas: Visita[]
  loading: boolean;
  telefone: String
  
  statusVisita : String[] = ["AGENDADO", "VISITADO", "CANCELADO"]

  constructor(private service: ClienteService, private route: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.nonModal = true;
    this.visita = new Visita();
    this.visita.cliente = new Cliente();
    this.searched = false;
    this.listar = true;
    this.list();
  }

  ngAfterViewInit() {
    $('#date').mask('99/99/9999');
  }

  list() {
    this.service.findVisitas().subscribe(response => {
        this.visitas = response
        this.loading = false;
        this.listar = true;
      }
    )
  }

  search(){
    this.loading = true;
    this.service.findByTelefone(this.telefone).subscribe(response => {
        if(response !== null && response !== undefined){
            this.visita.cliente = response
        } else {
          this.visita.cliente = new Cliente();
          this.visita.cliente.contato = this.telefone;
        }
        this.searched = true;
        this.loading = false;
      }
    );

  }
  save() {
    if(this.dataAgendamento == null) {
      this.dataAgendamento = new NgbDate(1980, 1, 1);
    }
    this.visita.dataVisita = new Date(this.dataAgendamento.month + "-" + this.dataAgendamento.day + "-"+this.dataAgendamento.year);
    this.service.saveAgendamento(this.visita).subscribe(
      response => {
        this.route.navigate(['home']).then(_ => null)
        this.list(); 
      }
    );
  }

  new() {
    this.listar = false;
  }

  cancelar() {
    this.ngOnInit()
  }

}
