import { Cliente } from "./cliente";
import { Pedido } from "./pedido";

export class Pagamento{
    id: number;
    pedido: Pedido;
    dataPagamento: Date;
    valorRecebido: number;
    cliente: Cliente
    numeroPagamento: String
    pedidoPagamento: number
}