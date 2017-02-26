import {StockService} from '../stock/service/stock.service';
import { StockHistory } from '../stock/model/stock';

export class UpdateStockBot {
    static updateStocks(stockService: StockService) {
        const x = -0.5;
        const y = 0.5;
        const num = parseFloat((Math.random() * (y - x) + x).toFixed(2));
        const randomIndex = Math.floor(Math.random()*8 + 1) % 8;

        stockService.setStockPrice(0, num);        
    }
}
