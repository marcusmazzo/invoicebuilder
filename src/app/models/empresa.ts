import { User } from "../users/user";


export class Empresa{
    id: number
    nome: string
    nipc: string
    user: User
    endereco: String
    telefone: String
    logotipoBase64: String
    informacoes: String
    email: String
    prazoMedioEntrega: number
    percentualLucro: number
    percentualIva: number
    iban: string
    

    constructor(
    ){

    }
}