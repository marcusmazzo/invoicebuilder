import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.component.html',
  styleUrls: ['./cliente-view.component.css']
})
export class ClienteViewComponent implements OnInit {

  constructor(private service: ClienteService, private route: Router) { }

  cliente: Cliente;
  pedido: Pedido;


  ngOnInit(): void {
    this.cliente = this.service.getCliente();
    if(this.cliente == null || this.cliente == undefined) {
      this.route.navigate(['cliente']).then(_ => null);
    }
    this.service.findById(this.cliente).subscribe ( response => {
        this.cliente = response;
        this.service.findAllPedidoByClienteId(this.cliente.id).subscribe(pedidos => this.cliente.pedidos = pedidos)
        
      }
    );
    this.pedido = new Pedido();
    this.pedido.expanded = false;
  }

  changePedido(pedido: Pedido){
    this.pedido = pedido;
    this.pedido.expanded = !this.pedido.expanded;
  }

  update(cliente: Cliente){
    this.service.save(cliente).subscribe(response => this.cliente = response);
  }

  new() {
    this.service.setIsNew(false);
    this.service.setCliente(this.cliente);
    this.route.navigate(['cliente/new']).then(_ => null);
  }

  download(id: number) {
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['/relatorio', id, this.cliente.id])
    );
    this.service.setCliente(JSON.parse(JSON.stringify(this.cliente)));
    window.open(url, "_blank");
  }

}
