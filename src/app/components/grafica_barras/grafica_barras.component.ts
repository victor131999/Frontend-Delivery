/*Grafica de Barras */
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChargeService } from 'src/app/core/services/charge.service';

@Component({
  selector: 'app-grafica_barras',
  templateUrl: './grafica_barras.component.html',
  styleUrls: ['./grafica_barras.component.css']
})

export class GraficaBarrasComponent implements OnInit {
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
     this.barChartLabels = ['','Johana', 'Carmen', 'Josee', 'Victor', 'Hugo',''];
     this.barChartType = 'bar';
     this.barChartLegend;
     console.log(this.numberDocs1,this.numberDocs2,this.numberDocs3,this.numberDocs4,this.numberDocs5)
     this.barChartData = [

      { data: [0,numberDocs1,numberDocs2, numberDocs3, numberDocs4, numberDocs5], label: 'Clientes Potenciales' }
    ];
  }

}
