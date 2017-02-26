import { Component, OnInit } from '@angular/core';
import {StockService} from '../../service/stock.service';
import {Stock} from '../../model/stock';


@Component({
  inputs:['stock'],
  selector: 'stock',
  template: `
  <div [ngClass]="selectedClass" class="list-item" (click)="selectStock($event)">
    <h4 md-line class="primary-text">{{stock.name}}</h4>
    <p md-line class="secondary-text"> {{stock.cur_price}}</p>
</div>
  `,
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stock: Stock;
  selectedClass: string = "";
  constructor(private stockService: StockService) { 
    
  }

  ngOnInit() {
    this.stockService.getCurrentStock().subscribe((curStock: Stock) => {
      this.selectedClass = curStock && this.stock && (this.stock.name === curStock.name) ? "selected" : ""
    });
  }

  selectStock(event){
    this.selectedClass = "selected";
    this.stockService.setCurrentStock(this.stock);
    event.preventDefault();
  }

}
