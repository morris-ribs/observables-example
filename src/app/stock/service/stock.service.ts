import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Stock} from '../model/stock';

@Injectable()
export class StockService {

  // a stream for new assets
  private stocksStream : BehaviorSubject <Stock[]> = new BehaviorSubject <Stock[]>([]);
  private currentStockStream : BehaviorSubject <Stock> = new BehaviorSubject<Stock>(new Stock());

  private dataStore: {  // This is where we will store our data in memory
    stocks: Stock[]
  };

  constructor(private http: Http) { 
    this.dataStore = {stocks: []};
    this.stocksStream = new BehaviorSubject <Stock[]>([]);
    this.currentStockStream = new BehaviorSubject<Stock>(new Stock());
  }

  // initial load
  loadStocks() : void {
     this.http.get('app/stock/service/data/stocks.json').map(
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
      if (stockUpdated.name === stock.name) { 
        this.dataStore.stocks[i] = stockUpdated;

        this.currentStockStream.map(stock => {
            return stockUpdated.name === stock.name ? stockUpdated : null;
        }).subscribe(newCurrentStock => {
          if(newCurrentStock != null) 
            this.setCurrentStock(newCurrentStock); 
        });
      }
    });

    this.stocksStream.next(Object.assign({}, this.dataStore).stocks);
  }


  setCurrentStock(stock: Stock){
    this.currentStockStream.next(stock);
  }

  getCurrentStock(): Observable<Stock>{
    return this.currentStockStream.asObservable().share();
  }

}
