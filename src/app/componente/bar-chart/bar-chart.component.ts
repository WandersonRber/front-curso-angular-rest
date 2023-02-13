import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType} from 'chart.js';
import { LabelItem } from 'chart.js';
import { UserChart } from 'src/app/model/UserChart';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private usuarioService : UsuarioService) { }

  userChart = new UserChart();

  ngOnInit(): void {
    this.usuarioService.carregarGrafico().subscribe (data =>{
      this.userChart = data;
     
      /*Nome*/
      this.barChartLabels = this.userChart.nome.split(',');

      /*Salário*/
      var arraySalario = JSON.parse('[' + this.userChart.salario + ']');

      this.barChartData = [
        { data: arraySalario, label: 'Salário Usuário' }
      ];
    });
  }

  barChartOptions: ChartOptions = {
  responsive: true,
};
barChartLabels: LabelItem[] | any;
barChartType: ChartType = 'bar';
barChartLegend = true;
barChartPlugins = [];

barChartData: ChartDataset[] = [
  { data: [], label: 'Salário Usuário' }
];

 }


