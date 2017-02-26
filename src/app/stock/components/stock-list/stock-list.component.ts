import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';
import { Observable } from 'rxjs/Rx';
import { StockComponent } from '../stock/stock.component';
import { Stock } from '../../model/stock';

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: Observable<Stock[]>;
  btnText: string = "Start Bot";
  state: boolean = false;
  constructor(private stockService: StockService) { 

  }

  ngOnInit() {
    this.stockService.loadStocks();

    this.stocks = this.stockService.getStocks().map(st => st.slice(0, 5));
  }
}
