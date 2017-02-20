export class StockHistory {
    date: string;
    price: number;
}

export class Stock {
    name: string;
    cur_price: number;
    history_prices: StockHistory[];
    company_name:string;
}
