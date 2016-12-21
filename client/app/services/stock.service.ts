import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StockService{
    constructor(private http:Http){
        console.log('Stock Service Initialized...');
    }

    getStocks(){
        return this.http.get('/api/stocks')
            .map(res => res.json());
    }

    addStock(newStock){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/stock', JSON.stringify(newStock), {headers: headers})
            .map(res => res.json());
    }

    deleteStock(id){
        return this.http.delete('/api/stock/'+id)
            .map(res => res.json());
    }

    updateStatus(stock){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/stock/'+stock._id, JSON.stringify(stock), {headers: headers})
            .map(res => res.json());
    }
}
