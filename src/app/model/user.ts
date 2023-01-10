import { Telefone } from "./telefone";

export class User {

    id: Number | undefined;
    login: String | undefined;
    senha: Number | undefined;
    nome : String | undefined;
    cpf: String | undefined;

    telefones: Array<Telefone> | undefined;
    
}
