import  WebSocKet  from  "ws";
import { Room } from "colyseus";
import  moment  from "moment";
// import crypto from "crypto";
const crypto = require("crypto");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = 'https://api.binance.com/';
const keys = {
'apiKey' : 'f2bO2GjACQOGM2VLQpjPFbccAjUBZRkA7uNWM40v563mIcofaiIP3qbMTyU7JBH7',
'secretKey' : 'ArCBx1AcUw9kJY7RYhnBMGdQDDd4grgkBzLg7D4uW0OypRVn1RN0SYRhZkNl9bER'

}

// import XMLHttpRequest from "xmlhttprequest";
export class ExchangeBinance extends Room{



    AboutAccount(){
        var  about_url  = url;
        var endpoint = 'api/v3/account';
        var dataquerystring = 'recWindow=20000&timestamp='+Date.now();
        var keys_account = keys;
        var signature = crypto.createHmac('sha256', keys_account['secretKey']).update(dataquerystring).digest('hex');
        var urlAccount = url + endpoint + '?'+ dataquerystring + '&signature='+signature;
        console.log(urlAccount);
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', urlAccount, true);
        ourRequest.setRequestHeader('X-MBX-APIKEY', keys_account['apiKey']);
        ourRequest.onload = function(){
            console.log(ourRequest.responseText);
        }
        ourRequest.send();
    }

    QueryOrder(symbol, orderId){
        var url='https://api.binance.com';
        var endpoint = '/api/v3/allOrders';
        var value = 'symbol='+symbol+'&orderId='+orderId+'&recvWindow=20000&timestamp='+Date.now();
        // var value = 'symbol=TRXUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=699&price=0.016&recvWindow=20000&timestamp='+Date.now();
        console.log(value);
        var keys = {
            'apiKey' : 'f2bO2GjACQOGM2VLQpjPFbccAjUBZRkA7uNWM40v563mIcofaiIP3qbMTyU7JBH7',
            'secretKey' : 'ArCBx1AcUw9kJY7RYhnBMGdQDDd4grgkBzLg7D4uW0OypRVn1RN0SYRhZkNl9bER'
        }
        var TradeURL = url+endpoint+'?'+value;
        var signature = crypto.createHmac('sha256', keys['secretKey']).update(value).digest('hex');
        var Ourl = url + endpoint + '?' + value +  '&signature=' + signature;
        console.log(Ourl);
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', Ourl, true);
        ourRequest.setRequestHeader('X-MBX-APIKEY', keys['apiKey']);
        ourRequest.onload = function(){
            console.log(ourRequest.responseText);
        }
        
        ourRequest.send();
    }
    SellOrder(symbol, quanlity, price){
        var url='https://api.binance.com';
        var endpoint = '/api/v3/order';
        var value = 'symbol='+symbol+'&side=SELL&type=LIMIT&timeInForce=GTC&quantity='+quanlity+'&price='+price+'&recvWindow=20000&timestamp='+Date.now();
        // var value = 'symbol=TRXUSDT&side=SELL&type=LIMIT&timeInForce=GTC&quantity=699&price=0.016&recvWindow=20000&timestamp='+Date.now();
        console.log(value);
        var keys = {
            'apiKey' : 'f2bO2GjACQOGM2VLQpjPFbccAjUBZRkA7uNWM40v563mIcofaiIP3qbMTyU7JBH7',
            'secretKey' : 'ArCBx1AcUw9kJY7RYhnBMGdQDDd4grgkBzLg7D4uW0OypRVn1RN0SYRhZkNl9bER'
        }
        var TradeURL = url+endpoint+'?'+value;
        var signature = crypto.createHmac('sha256', keys['secretKey']).update(value).digest('hex');
        var Ourl = url + endpoint + '?' + value +  '&signature=' + signature;
        console.log(Ourl);
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('POST', Ourl, true);
        ourRequest.setRequestHeader('X-MBX-APIKEY', keys['apiKey']);
        ourRequest.onload = function(){
            console.log(JSON.parse(ourRequest.responseText).orderId);
            console.log(JSON.parse(ourRequest.responseText).clientOrderId);
        }
        
        ourRequest.send();

    }
    
    CreateNewOrder(symbol, quanlity, price){
        var url='https://api.binance.com';
        var endpoint = '/api/v3/order';
        var value = 'symbol='+symbol+'&side=BUY&type=LIMIT&timeInForce=GTC&quantity='+quanlity+'&price='+price+'&recvWindow=20000&timestamp='+Date.now();
        var keys = {
            'apiKey' : 'f2bO2GjACQOGM2VLQpjPFbccAjUBZRkA7uNWM40v563mIcofaiIP3qbMTyU7JBH7',
            'secretKey' : 'ArCBx1AcUw9kJY7RYhnBMGdQDDd4grgkBzLg7D4uW0OypRVn1RN0SYRhZkNl9bER'
        }
        var TradeURL = url+endpoint+'?'+value;
        var signature = crypto.createHmac('sha256', keys['secretKey']).update(value).digest('hex');
        var Ourl = url + endpoint + '?' + value +  '&signature=' + signature;
        console.log(Ourl);
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('POST', Ourl, true);
        ourRequest.setRequestHeader('X-MBX-APIKEY', keys['apiKey']);
        ourRequest.onload = function(){
            console.log(ourRequest.responseText);
        }
        
        ourRequest.send();
    }
    CanCelOrder(symbol, orderId){
        var url='https://api.binance.com';
        var endpoint = '/api/v3/order';
        var value = 'symbol='+symbol+'&orderId='+orderId+'&recvWindow=20000&timestamp='+Date.now();
        var keys = {
            'apiKey' : 'f2bO2GjACQOGM2VLQpjPFbccAjUBZRkA7uNWM40v563mIcofaiIP3qbMTyU7JBH7',
            'secretKey' : 'ArCBx1AcUw9kJY7RYhnBMGdQDDd4grgkBzLg7D4uW0OypRVn1RN0SYRhZkNl9bER'
        }
        var TradeURL = url+endpoint+'?'+value;
        var signature = crypto.createHmac('sha256', keys['secretKey']).update(value).digest('hex');
        var Ourl = url + endpoint + '?' + value +  '&signature=' + signature;
        console.log(Ourl);
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('DELETE', Ourl, true);
        ourRequest.setRequestHeader('X-MBX-APIKEY', keys['apiKey']);
        ourRequest.onload = function(){
            console.log(ourRequest.responseText);
        }
        
        ourRequest.send();
    }
     GetTradeHistory(btc){
         var url = "wss://stream.binance.com:9443/ws/"+btc+"@aggTrade";
        const ws = new WebSocKet(url);

        
        ws.on('message', (data: any) => {
            if (data) {
                var eventime = JSON.parse(data).E; // parsing single-trade record
                var s = JSON.parse(data).s;
                var price = JSON.parse(data).p;
                var qua = JSON.parse(data).q;
                var time  =new Date(eventime).toLocaleDateString("en-US")+ " " + new Date(eventime).toLocaleTimeString("en-US") ;
                this.broadcast("trade", time + " " + s + " " + price +  " " +parseFloat(qua));
                
            } 
        });
        
    }
   
    GetAllPrice(btc){
        var url = "wss://stream.binance.com:9443/ws/!bookTicker";
        const ws2 = new WebSocKet(url);
        var btc = btc.toUpperCase();
        ws2.on('message', (data: any) => {
             var s = JSON.parse(data).s;
             var b = JSON.parse(data).b;
             
             if((s.substr(s.length - 3))== btc){
                this.broadcast("ticker", s +"  " +  b);
             }
             
            
        })
        
    }
    GetOrderBookBUY(btc){
        var url = "wss://stream.binance.com:9443/ws/"+btc+"@depth";
        const ws2 = new WebSocKet(url);
        
        ws2.on('message', (data: any) => {
             var buy = JSON.parse(data).a;
             this.broadcast("buy", buy);
            
        })
        
    }
    GetOrderBookSELL(btc){
        var url = "wss://stream.binance.com:9443/ws/"+btc+"@depth";
        const ws2 = new WebSocKet(url);
        
        ws2.on('message', (data: any) => {
             var sell = JSON.parse(data).b;
             this.broadcast("sell", sell);
            
        })
        
    }
    
    TradeHistoryAccount(){

    }
    BookTicker(){
        var url  = "wss://stream.binance.com:9443/ws/!ticker@arr";
        const ws_bookticker = new WebSocKet(url);
        ws_bookticker.on("message", (data: any)=>{
            var s = JSON.parse(data).s;
            var price = JSON.parse(data).b;
            if(s.slice(s.length - 3) == "BTC"){
                var btc = JSON.parse(data).s;
                
                this.broadcast("bookticker", btc +" "+ parseFloat(price));
            }
            
        })
    }
    
    
    onCreate(option) {
        console.log("Chat room created!", option);
        // this.CreateNewOrder();
        // this.AboutAccount();
        // this.SellOrder(('trxusdt').toLocaleUpperCase(), '699', '0.01600');
        this.QueryOrder(('trxusdt').toLocaleUpperCase(), '297597517');
        // this.CanCelOrder(('trxusdt').toLocaleUpperCase(), '297594816');
        this.GetTradeHistory("adabtc");
        this.GetAllPrice("btc");
    
        this.GetOrderBookBUY("adabtc");
        this.GetOrderBookSELL("adabtc");
        
        this.onMessage("message", (client, message)=>{
            
            
        });
    }
}
