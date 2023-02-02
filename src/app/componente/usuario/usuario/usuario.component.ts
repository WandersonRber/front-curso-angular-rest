import { Type } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  students : Array<User> | undefined | any;
  nome : String | undefined | any;
  p: any;
  total: Number | undefined | any;

  constructor(private usuarioService : UsuarioService) {
    
  }

  ngOnInit() {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

  deleteUsuario(id: any, index: any){

    if (confirm('Deseja mesmo remover?')){

    this.usuarioService.deleteUsuario(id).subscribe(data =>{
      //console.log("Retorno do método delete : " + data);

      this.students.splice(index, 1); /*Remover da tela*/
      //this.usuarioService.getStudentList().subscribe(data => {
       // this.students = data;
     // });

    });
  }
  }

consultarUser(nome: any){

  if(this.nome === ''){
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }else{
   
    this.usuarioService.consultarUser(nome).subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

 
}

carregarPagina(pagina: any){

  if(this.nome !== ''){
    this.usuarioService.consultarUserPorPage(this.nome, (pagina - 1)).subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }else{
    this.usuarioService.getStudentListPage(pagina - 1).subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }
}

imprimeRelatorio(){
  return this.usuarioService.downloadPdfRelatorio();
}

}
