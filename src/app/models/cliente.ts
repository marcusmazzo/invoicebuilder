import { Pedido } from "./pedido"

export class Cliente {
    nome: String
    endereco: String
    nif: String
    telefone: String
    pedidos: Pedido[]
    email: String
    expanded: boolean

}