import { Profissao } from "./profissao";
import { Telefone } from "./telefone";

export class User {

    id: Number | undefined;
    login: String | undefined;
    senha: Number | undefined;
    nome: String | undefined;
    cpf: String | undefined;
    dataNascimento: String | undefined;

    profissao: Profissao = new Profissao();

    salario : DoubleRange | undefined;

    telefones: Array<Telefone> | undefined;

}
