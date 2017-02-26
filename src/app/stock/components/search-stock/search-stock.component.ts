import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../service/stock.service';

@Component({
  selector: 'search-stock',
  template: `
    <h3>Search for stocks:</h3>
    <md-input-container>
      <input md-input placeholder="Stock" type="text" [(ngModel)]="stockName" />
    </md-input-container>
    <button md-button (click)="searchForStock($event)">OK</button>
    <stock-detail></stock-detail>
  `,
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit {
  stockName: string;
  stock: Stock;
  constructor(private stockService: StockService) { }

  ngOnInit() {
  }


  searchForStock(event) {
    this.stockService.getStocks().subscribe(st => {
      this.stock = st.find(stock => stock.name === this.stockName);
    } );
    this.stockService.setCurrentStock(this.stock);
    event.preventDefault();
  }

}
