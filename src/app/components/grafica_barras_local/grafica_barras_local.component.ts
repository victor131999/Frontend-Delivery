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
 numberDocs1 : number;
 numberDocs2 : number;
 numberDocs3 : number;
 numberDocs4 : number;
 numberDocs5 : number;
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
                        this.grafica(this.numberDocs1,this.numberDocs2,this.numberDocs3,this.numberDocs4,this.numberDocs5)                     
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



  
  grafica(numberDocs1 : number,numberDocs2 : number,numberDocs3 : number,numberDocs4 : number,numberDocs5 : number){
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
     console.log(this.numberDocs1,this.numberDocs2,this.numberDocs3,this.numberDocs4,this.numberDocs5)
     this.barChartData = [

      { data: [1,9, 2, 8, 7,3,3,8,10,0,0,0], label: 'Camifer' },
      { data: [5,4, 2, 7, 9,4,5,7,9,0,0,0], label: 'Ecofashon' },
      { data: [8,1, 5, 5, 1,2,4,9,8,0,0,0], label: 'Moarde' },
      { data: [3,2, 4, 2, 2,8,10,2,7,0,0,0], label: 'Emprovit' }
    ];
  }

}
