import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChargeService } from 'src/app/core/services/charge.service';
@Component({
  selector: 'app-grafica_pastel',
  templateUrl: './grafica_pastel.component.html',
  styleUrls: ['./grafica_pastel.component.css']
})
export class GraficaPastelComponent implements OnInit {
    numberDocs1 : number;
    numberDocs2 : number;
    numberDocs3 : number;
    numberDocs4 : number;
    numberDocs5 : number;
   pieChartOptions: ChartOptions;
   pieChartLabels: Label[];
   pieChartData: number[];
   pieChartType: ChartType;
   pieChartLegend = true;
   pieChartColors;

  constructor(private chargeService: ChargeService) { }

  ngOnInit() {
    this.graficaPastel(this.numberDocs1,this.numberDocs2,this.numberDocs3,this.numberDocs4,this.numberDocs5);
    this.count();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  graficaPastel(numberDocs1 : number,numberDocs2 : number,numberDocs3 : number,numberDocs4 : number,numberDocs5 : number){
     // Pie
  this.pieChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: ( ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  this.pieChartLabels = [['Johana'], ['Carmen'], ['Josee'], ['Victor'], 'Hugo'];
  this.pieChartData = [numberDocs1,numberDocs2, numberDocs3, numberDocs4, numberDocs5];
  this.pieChartType= 'pie';
  this.pieChartLegend;
  this.pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0.3,0,255,)'],
    },
  ];
  }

  count(){
    this.chargeService.countChargesCustomer1().subscribe(
      result => {    
        this.numberDocs1 = result.numberDocs1;  
        this.chargeService.countChargesCustomer2().subscribe(
          result => {    
            this.numberDocs2 = result.numberDocs2; 
            this.chargeService.countChargesCustomer3().subscribe(
              result => {    
                this.numberDocs3 = result.numberDocs3;  
                this.chargeService.countChargesCustomer4().subscribe(
                  result => {    
                    this.numberDocs4 = result.numberDocs4;  
                    this.chargeService.countChargesCustomer5().subscribe(
                      result => {    
                        this.numberDocs5 = result.numberDocs5;  
                        console.log(this.numberDocs1,this.numberDocs2,this.numberDocs3,this.numberDocs4,this.numberDocs5)
                        this.graficaPastel(this.numberDocs1,this.numberDocs2,this.numberDocs3,this.numberDocs4,this.numberDocs5)                     
                      }
                    );                   
                  }
                );                 
              }
            );                    
          }
        );                   
      }
    );
  }

}