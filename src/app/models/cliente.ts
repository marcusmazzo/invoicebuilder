import { Empresa } from "./empresa"
import { Pedido } from "./pedido"

export class Cliente {
    id: number
    nome: String
    endereco: String
    docIdentificacao: String
    contato: String
    pedidos: Pedido[]
    email: String
    expanded: boolean
    empresa: Empresa

}