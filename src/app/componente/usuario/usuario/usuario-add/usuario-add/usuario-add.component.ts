import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { findIndex } from 'rxjs';
import { Telefone } from 'src/app/model/telefone';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  fone: any;
  telefone = new Telefone();

  constructor (private  routeActive: ActivatedRoute, private userService: UsuarioService ) { }

  ngOnInit() {
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

  novo(){
    this.usuario = new User();
    this.telefone = new Telefone();
  }

}
