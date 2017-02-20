import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Stock } from '../../model/stock';
import { StockService } from '../../service/stock.service';

@Component({
  selector: 'stock-history-update',
  templateUrl: './stock-history-update.component.html',
  styleUrls: ['./stock-history-update.component.css']
})
export class StockHistoryUpdateComponent implements OnInit {
  stockName: any = "";
  stockList: Stock[];
  today : string;
  price: number;
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe(s => {this.stockList = s; console.log(this.stockList);});


    let curDate = new Date();
    const dd = curDate.getDate();
    let ddStr = dd.toString();
    const mm = curDate.getMonth()+1; //January is 0!
    let mmStr = mm.toString();

    var yyyy = curDate.getFullYear();
    if(curDate.getDate()<10){
        ddStr = '0'+dd;
    } 
    if(mm<10){
        mmStr ='0'+mm;
    } 
    this.today = yyyy + '-' + mmStr + '-' + ddStr;
  }

  insertHistory(event) {
    if (this.stockName !== "") {
      let stock = this.stockList.find(s => s.name === this.stockName);
      stock.history_prices.push({ date: this.today, price: this.price });
      this.stockService.updateStock(stock);
    }

    event.preventDefault();
  }

}
