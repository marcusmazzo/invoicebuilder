import { Cliente } from "./cliente";
import { Pedido } from "./pedido";

export class Documentos {
    id: number;
    cliente: Cliente
    pedido: Pedido
    contratoBase64: String
    nomeDocumento: string
}