import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';
import { Telefone } from 'src/app/model/telefone';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string>{

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null | any {
   
    if(value){
      let date = value.split(this.DELIMITER);
      return{
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
      return null;
    }
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year: '';
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter{

  readonly DELIMITER = '/' // 18/10/1987
  
  parse(value: string): NgbDateStruct | null |any{
   
    if(value){
        let date = value.split(this.DELIMITER);
        return{
          day: parseInt(date[0], 10),
          month: parseInt(date[1], 10),
          year: parseInt(date[2], 10)
        };
        return null
    }
  } 
  format(date: NgbDateStruct): string{
    
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null | any{
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year: '';
  }

}

function validarDia(valor: any) {
  if(valor.toString !== '' && parseInt(valor) <= 9){
    return '0' +valor;
  }else{
    return valor;
  }

}


@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass : FormataData},
             {provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  fone: any;
  telefone = new Telefone();
  profissoes: Array<Profissao> = [];

  constructor (private  routeActive: ActivatedRoute, private userService: UsuarioService ) { }

  ngOnInit() {

    this.userService.getProfissaoList().subscribe(data => {
      this.profissoes = data;
      //console.log("aquiiiiiiiiiiiiiiiiii",this.profissoes)

    });
    
    let id = this.routeActive.snapshot.paramMap.get('id'); 

    if(id != null) {
      this.userService.getStudnet(id).subscribe(data =>{
        this.usuario = data;
        console.log("mostrar", this.usuario)
      });
       }
  }

  salvarUser(){
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null){ /* Atualizando ou Editando */
        this.userService.updateUsuario(this.usuario).subscribe(data =>{
          this.novo();
          console.info("user atualizado" + data);
        });
    }else{
      this.userService.salvarUsuario(this.usuario).subscribe (data =>{ /* Salvando um novo user */
        this.novo();
        console.info("Gravou user" + data);
      });
    }
  }

  deletarTelefone(id: any, i: any){
    if(id == null){
      this.usuario.telefones?.splice(i, 1);
      return;
    }
    if(id != null && confirm("Deseja remover?")){
      this.userService.removerTelefone(id).subscribe(data =>{
       
        this.usuario.telefones?.splice(i, 1);
      });
    }
  }
  
  addFone(){

    if(this.usuario.telefones === undefined){
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

}
