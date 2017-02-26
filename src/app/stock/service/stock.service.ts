import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable, BehaviorSubject, Subject} from 'rxjs/Rx';
import {Stock} from '../model/stock';

@Injectable()
export class StockService {

  // a stream for new assets
  private stocksStream : BehaviorSubject <Stock[]> ;
  private currentStockStream : Subject <Stock>;

  private dataStore: {  // This is where we will store our data in memory
    stocks: Stock[]
  };

  constructor(private http: Http) { 
    this.dataStore = {stocks: []};
    this.stocksStream = new BehaviorSubject <Stock[]>([]);
    this.currentStockStream = new Subject<Stock>();
  }

  // initial load
  loadStocks() : void {
     this.http.get('http://localhost:9000/').map(
       res => res.json())
       .subscribe(stocks => {
         this.dataStore.stocks = stocks;
         this.stocksStream.next(Object.assign({}, this.dataStore).stocks); 
        });       
  }

  getStocks(): Observable<Stock[]> {
     return this.stocksStream.asObservable();
  }

  setStockPrice(index:number, priceToAdd: number) {
    if (this.dataStore.stocks[index]) {
      const p = this.dataStore.stocks[index].cur_price + priceToAdd;
      this.dataStore.stocks[index].cur_price = parseFloat(p.toFixed(2));
      this.updateStock(this.dataStore.stocks[index]);
    }
  }

  // update a stock
  updateStock(stockUpdated: Stock){
    
    const body = JSON.stringify(stockUpdated);
    let headers      = new Headers({ 'Content-Type': 'text/plain' }); // ... Set content type as text in order not to trigger preflight OPTIONS request
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.post('http://localhost:9000/stock', body, options)
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }


  setCurrentStock(stock: Stock){
    this.currentStockStream.next(stock);
  }

  getCurrentStock(): Observable<Stock>{
    return this.currentStockStream.asObservable().share();
  }

}
