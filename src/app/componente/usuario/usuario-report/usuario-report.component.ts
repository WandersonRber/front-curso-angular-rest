import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserReport } from 'src/app/model/userReport';
import { UsuarioService } from 'src/app/service/usuario.service';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string>{

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null | any {

    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
      return null;
    }
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/' // 18/10/1987

  parse(value: string): NgbDateStruct | null | any {

    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
      return null
    }
  }
  format(date: NgbDateStruct): string {

    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null | any {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

}

function validarDia(valor: any) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  } else {
    return valor;
  }

}

@Component({
  selector: 'app-root',
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class UsuarioReportComponent {

  userReport = new UserReport();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  imprimeRelatorio() {
    this.userService.downloadPdfRelatorioParam(this.userReport);
  }



}
