import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Stock} from './stock';

@Injectable()
export class StockService {

  // a stream for new assets
  stocksStream : BehaviorSubject <Stock[]> ;

  private dataStore: {  // This is where we will store our data in memory
    stocks: Stock[]
  };

  constructor(private http: Http) { 
    this.dataStore = {stocks: []};
    this.stocksStream = new BehaviorSubject <Stock[]>([]);
  }

  // initial load
  loadStocks() : void {
     this.http.get('app/stock/data/stocks.json').map(
       res => res.json())
       .subscribe(stocks => {
         this.dataStore.stocks = stocks;
         this.stocksStream.next(Object.assign({}, this.dataStore).stocks); 
        });       
  }

  getStocks(): Observable<Stock[]> {
     return this.stocksStream.asObservable().share();
  }

  // update a stock
  updateStock(stockUpdated: Stock){
    this.dataStore.stocks.forEach((stock, i) => {
      if (stock.name === stock.name) { this.dataStore.stocks[i] = stock; }
    });

    this.stocksStream.next(Object.assign({}, this.dataStore).stocks);
  }

}
