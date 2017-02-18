import { Component, OnInit } from '@angular/core';
import {StockService} from '../../service/stock.service';
import {Stock} from '../../model/stock';


@Component({
  inputs:['stock'],
  selector: 'stock',
  templateUrl: './stock.component.html',
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
