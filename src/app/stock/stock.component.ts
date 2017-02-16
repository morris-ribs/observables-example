import { Component, OnInit } from '@angular/core';
import {StockService} from '../stock.service';
import {Observable} from 'rxjs/Rx';
import {Stock} from '../stock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks: Observable<Stock[]>;
  constructor(private stockService: StockService) { 

  }

  ngOnInit() {
    this.stocks = this.stockService.getStocks();
    this.stockService.loadStocks();
  }

}
