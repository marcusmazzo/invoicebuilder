import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.component.html',
  styleUrls: ['./cliente-view.component.css']
})
export class ClienteViewComponent implements OnInit {

  constructor(private service: ClienteService) { }

  message: String;
  cliente: Cliente;
  pedido: Pedido;

  ngOnInit(): void {
    this.message = "valeu"
    this.cliente = this.service.getCliente();
    this.pedido = new Pedido();
    this.pedido.expanded = false;
  }

  changePedido(pedido: Pedido){
    this.pedido = pedido;
    this.pedido.expanded = !this.pedido.expanded;
  }

}
