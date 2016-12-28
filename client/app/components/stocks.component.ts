import { Component } from '@angular/core';
import {StockService} from '../services/stock.service';
import {Stock} from '../../Stock';

@Component({
  moduleId: module.id,
  selector: 'stocks',
  templateUrl: 'stocks.component.html'
})

export class StocksComponent {
    stocks: Stock[];
    title: string;
    isOwned: boolean;
    amount: number;

    constructor(private stockService:StockService){
        this.stockService.getStocks()
            .subscribe(stocks => {
                this.stocks = stocks;
            });
    }

    addStock(event){
        event.preventDefault();
        var newStock = {
            title: this.title,
            isOwned: false,
            amount: this.amount
        }

        this.stockService.addStock(newStock)
            .subscribe(stock => {
                this.stocks.push(stock);
                this.title = '';
            });
    }

    deleteStock(id){
        var stocks = this.stocks;

        this.stockService.deleteStock(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < stocks.length;i++){
                    if(stocks[i]._id == id){
                        stocks.splice(i, 1);
                    }
                }
            }
        });
    }

    updateStatus(stock){
        var _stock = {
            _id: stock._id,
            title: stock.title,
            isOwned: !stock.isOwned,
            amount: stock.amount
        };

        this.stockService.updateStatus(_stock).subscribe(data => {
            stock.isOwned = !stock.isOwned;
        });
    }
}
