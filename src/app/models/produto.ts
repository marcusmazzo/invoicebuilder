import { TipoProduto } from "./tipoProduto";

export class Produto {
    id: number;
    descricao: String;
    tipoProduto: TipoProduto;
    custoMedio: number;
    descricaoCompleta: String
    garantia: String
    exigeDimensao: boolean;

}