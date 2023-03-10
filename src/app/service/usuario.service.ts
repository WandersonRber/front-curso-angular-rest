import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { UserReport } from '../model/userReport';


@Injectable({
   providedIn: 'root'
})
export class UsuarioService {

   constructor(private http: HttpClient) {

   }

   getStudentList(): Observable<any> {
      return this.http.get<any>(AppConstants.baseUrl);
   }

   getProfissaoList(): Observable<any> {
      return this.http.get<any>(AppConstants.getBaseUrlPath + 'profissao/');
   }

   getStudentListPage(pagina: any): Observable<any> {
      return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
   }

   getStudnet(id: any): Observable<any> {
      return this.http.get<any>(AppConstants.baseUrl + id);
   }

   deleteUsuario(id: Number): Observable<any> {
      return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
   }

   //http://localhost:8080/cursospringrestapi/usuario/usuarioPornome/alex
   consultarUser(nome: String): Observable<any> {
      return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome);
   }

   consultarUserPorPage(nome: String, page: Number): Observable<any> {
      return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome + "/page/" + page);
   }


   salvarUsuario(user: any): Observable<any> {
      return this.http.post<any>(AppConstants.baseUrl, user);
   }

   updateUsuario(user: any): Observable<any> {
      return this.http.put<any>(AppConstants.baseUrl, user);
   }

   removerTelefone(id: any): Observable<any> {
      return this.http.delete(AppConstants.baseUrl + "romverTelefone/" + id, { responseType: 'text' });
   }

   userAutenticacao() {
      if (localStorage.getItem('token') != null &&
         localStorage.getItem('token')?.toString().trim() !== null) {
         return true;
      } else {
         return false;
      }

   }

   downloadPdfRelatorio() {
      return this.http.get(AppConstants.baseUrl + 'relatorio', { responseType: 'text' }).subscribe(data => {
         document.querySelector<any>('iframe').src = data;
      });
   }

   downloadPdfRelatorioParam(userreport: UserReport) {

      return this.http.post(AppConstants.baseUrl + 'relatorio/', userreport, { responseType: 'text' }).subscribe(data => {
         document.querySelector<any>('iframe').src = data;
      });
   }

   carregarGrafico() : Observable<any>{
      return this.http.get(AppConstants.baseUrl + 'grafico');
   }

}
