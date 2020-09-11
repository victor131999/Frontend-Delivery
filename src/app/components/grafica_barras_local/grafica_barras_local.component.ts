/*Grafica de Barras */
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChargeService } from 'src/app/core/services/charge.service';

@Component({
  selector: 'app-grafica_barras_local',
  templateUrl: './grafica_barras_local.component.html',
  styleUrls: ['./grafica_barras_local.component.css']
})

export class GraficaBarrasLocalComponent implements OnInit {
 numberDocsLocal1 : number;
 numberDocsLocal2 : number;
 numberDocsLocal3 : number;
 numberDocsLocal4 : number;
 barChartOptions: ChartOptions;
 barChartLabels: Label[];
 barChartType: ChartType;
 barChartLegend = true;
 barChartData: ChartDataSets[];
  constructor(private chargeService: ChargeService) { }


  ngOnInit() {
    this.count();
  }

  count(){
    this.chargeService.OrdersLocal1().subscribe(
      result => {    
        this.numberDocsLocal1 = result.numberDocsLocal1;  
        this.chargeService.OrdersLocal2().subscribe(
          result => {    
            this.numberDocsLocal2 = result.numberDocsLocal2; 
            this.chargeService.OrdersLocal3().subscribe(
              result => {    
                this.numberDocsLocal3 = result.numberDocsLocal3;  
                this.chargeService.OrdersLocal4().subscribe(
                  result => {    
                    this.numberDocsLocal4 = result.numberDocsLocal4;   
                        
                        console.log(this.numberDocsLocal1,this.numberDocsLocal2,this.numberDocsLocal3,this.numberDocsLocal4)
                        this.grafica(this.numberDocsLocal1,this.numberDocsLocal2,this.numberDocsLocal3,this.numberDocsLocal4)                     
                      }
                    );                   
                  }
                );                 
              }
            );                    
          }
        );                   
      }



      grafica(numberDocsLocal1 : number,numberDocsLocal2 : number,numberDocsLocal3 : number,numberDocsLocal4 : number){
        this.barChartOptions = {
         responsive: true,
         scales: { xAxes: [{}], yAxes: [{}] },
         plugins: {
           datalabels: {
             anchor: 'end',
             align: 'end',
           }
         }
       };
        this.barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.barChartType = 'bar';
        this.barChartLegend;
        console.log(this.numberDocsLocal1,this.numberDocsLocal2,this.numberDocsLocal3,this.numberDocsLocal4)
        this.barChartData = [
   
         { data: [1,9, 2, 8, 7,3,3,8,numberDocsLocal1,0,0,0], label: 'Camifer' },
         { data: [5,4, 2, 7, 9,4,5,7,numberDocsLocal2,0,0,0], label: 'Ecofashon' },
         { data: [8,1, 5, 5, 1,2,4,9,numberDocsLocal3,0,0,0], label: 'Moarde' },
         { data: [3,2, 4, 2, 2,8,10,2,numberDocsLocal4,0,0,0], label: 'Emprovit' }
       ];
     }
   
   }




  
