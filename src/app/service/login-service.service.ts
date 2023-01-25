
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Route, Router } from '@angular/router';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  recuperar(login: any) {

    let user = new User();
    user.login = this.login;

    return this.http.post(AppConstants.getBaseUrlPath + 'recuperar/', user).subscribe(data => {

      alert(JSON.parse(JSON.stringify(data)).error);

    },
      Error => {
        console.error("Erro ao recuperar login");
        alert('Erro ou recuperar login')
      }

    );

  }

  login(usuario: { login: string; senha: string; }) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {

      /*Retorno*/

      var token = (JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]);

      localStorage.setItem("token", token);

      console.info("Token:" + localStorage.getItem("token"));

      this.router.navigate(['home']);

    },
      Error => {
        console.error("Erro ao fazer login");
        alert('Acesso Negado!')
      }

    );

  }

}
