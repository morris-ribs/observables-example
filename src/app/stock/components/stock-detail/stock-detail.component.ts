import { Component, OnInit } from '@angular/core';
import {StockService} from '../../service/stock.service';
import {Stock} from '../../model/stock';

@Component({ 
  selector: 'stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  stock: Stock;

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];  
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private stockService: StockService) { 
    
  }

  ngOnInit() {
    this.stockService.getCurrentStock().subscribe((curStock: Stock) => this.stock = curStock);

  }

  ngDoCheck(){        
    this.lineChartData = [{data: this.stock && this.stock.history_prices ? 
      this.stock.history_prices.sort((hist1,hist2) => (hist1.date < hist2.date) ?  0 :  1 ).map(hist => hist.price): [], label: this.stock.name}];

    this.lineChartLabels = this.stock && this.stock.history_prices ? 
      this.stock.history_prices.map(hist => hist.date).sort((date1,date2) => (date1 < date2) ?  0 :  1 ): [];
  }
}
