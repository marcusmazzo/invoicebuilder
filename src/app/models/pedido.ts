import { Cliente } from "./cliente"
import { Item } from "./item"

export class Pedido {
    
    id: number
    numeroPedido: String
    valorTotal: number
    valorTotalIva: number
    dataPedido: Date
    dataPrevisaoEntrega: Date
    dataEntrega: Date
    estadoPedido: String
    itens: Item[]
    expanded: boolean;
    cliente: Cliente
    pagamentoComIva: boolean
    valorTotalPedido: number
    valorTotalPedidoIva: number;

    custoTotalPedido: number
    totalItensPedido: number
    valorTotalPago: number;
    statusPedido: string;
    numeroRecibo: string;
}