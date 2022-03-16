import { Cliente } from "./cliente"
import { Item } from "./item"

export class Pedido {
    
    id: number
    numeroPedido: String
    valorTotal: number
    valorTotalIva: number
    dataPedido: Date
    estadoPedido: String
    itens: Item[]
    expanded: boolean;
    cliente: Cliente

    valorTotalPedido: number
    custoTotalPedido: number
    totalItensPedido: number
    valorTotalPago: number;
}