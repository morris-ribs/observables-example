import { Component, OnInit } from '@angular/core';
import { UpdateStockBot } from '../update-stock-bot';
import { StockService } from '../../stock/service/stock.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'update-stock-bot',
  templateUrl: './update-stock-bot.component.html',
  styleUrls: ['./update-stock-bot.component.css']
})
export class UpdateStockBotComponent implements OnInit {
  state: boolean = false;
  running: boolean = false;
  subscribed: boolean = false;
  btnText: string = "Start the bot!";
  time: number = 5;
  subscription: Subscription;
  constructor(private stockService: StockService) { }

  ngOnInit() {
  }

  toggleBot(event) {
    this.state = !this.state;
    if (this.state){
      this.decrementTime();
      this.btnText = "Stop the bot!";
    }
    else {
      this.time = 5; 
      this.btnText = "Start the bot!";
    }

    event.preventDefault();
  }

  decrementTime(){
    if(this.state) {
      setTimeout(() => {
        if (this.time > 1) {
          this.running = false;
          this.time--;
        } else { 
          UpdateStockBot.updateStocks(this.stockService);
          this.running = true;
          this.time = 5; 
        }

        this.decrementTime(); 
      }, 
      1000);      
    }
  }
}
