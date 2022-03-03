import { Item } from "./item"

export class Pedido {
    
    numeroPedido: String
    valorTotal: number
    valorTotalIva: number
    dataPedido: Date
    status: String
    itensPedido: Item[]
    expanded: boolean;
}