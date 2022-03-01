import { Item } from "./item"

export class Pedido {
    
    numeroPedido: String
    valorTotal: Number
    valorTotalIva: Number
    dataPedido: Date
    status: String
    itensPedido: Item[]
    expanded: boolean;
}