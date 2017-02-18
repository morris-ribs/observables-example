import {StockService} from '../stock/service/stock.service';
import { StockHistory } from '../stock/model/stock';

export class UpdateStockBot {
    static updateStocks(stockService: StockService) {
        const x = -0.5;
        const y = 0.5;
        const num = Math.random() * (y - x) + x;
        const randomIndex = Math.floor(Math.random()*6 + 1) % 6;

        stockService.getStocks().subscribe(stocks => {
            let stock = stocks[randomIndex];
            const hist:StockHistory =  { date: new Date(), price: stock.cur_price };
            stock.history_prices.push(hist);   
            stock.cur_price = parseFloat((stock.cur_price + num).toFixed(2));
        });
    }
}
