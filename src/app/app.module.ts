import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component'; /* Requisições Ajax */
import { RouterModule, Routes } from '@angular/router'
import { ModuleWithProviders} from '@angular/core';
import { LoginComponent } from './login/login.component';
import {HttpInterceptorModule} from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario/usuario-add/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from 'ngx-currency';



 
export const appRouters: Routes = [
 
  {path : 'home', component : HomeComponent, canActivate: [GuardiaoGuard]},
  {path : 'login', component : LoginComponent},
  {path : '', component : LoginComponent},
  {path : 'userList', component : UsuarioComponent, canActivate: [GuardiaoGuard]}, 
  {path : 'usuarioAdd', component : UsuarioAddComponent, canActivate: [GuardiaoGuard]},
  {path : 'usuarioAdd/:id', component : UsuarioAddComponent, canActivate: [GuardiaoGuard]},

];

export const routes: ModuleWithProviders<any> = RouterModule.forRoot(appRouters);
export const optionsMask : Partial<IConfig> | (() => Partial<IConfig>) = {}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
