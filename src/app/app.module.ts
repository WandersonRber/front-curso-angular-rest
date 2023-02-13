import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { NgxCurrencyModule } from 'ngx-currency';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { BarChartComponent } from './componente/bar-chart/bar-chart.component';
import { UsuarioReportComponent } from './componente/usuario/usuario-report/usuario-report.component';
import { UsuarioAddComponent } from './componente/usuario/usuario/usuario-add/usuario-add/usuario-add.component';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { HomeComponent } from './home/home.component'; /* Requisições Ajax */
import { LoginComponent } from './login/login.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { HttpInterceptorModule } from './service/header-interceptor.service';


export const appRouters: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'userList', component: UsuarioComponent, canActivate: [GuardiaoGuard] },
  { path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'userReport', component: UsuarioReportComponent, canActivate: [GuardiaoGuard] },
  { path: 'chart', component:BarChartComponent, canActivate: [GuardiaoGuard] },
];

export const routes: ModuleWithProviders<any> = RouterModule.forRoot(appRouters);
export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    UsuarioReportComponent,
    BarChartComponent
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
    NgxCurrencyModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
