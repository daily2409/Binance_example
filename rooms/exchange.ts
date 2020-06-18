import  WebSocKet  from  "ws";
import { Room } from "colyseus";
import  moment  from "moment";
// import crypto from "crypto";
const crypto = require("crypto");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// import XMLHttpRequest from "xmlhttprequest";
export class ExchangeBinance extends Room{
    AboutAccount(){
        var  url = 'https://api.binance.com';
        var endpoint = '/api/v3/account';
        var dataquerystring = 'recWindow=20000&timestamp='+Date.now();
        var keys = {
            'apiKey' : 'f2bO2GjACQOGM2VLQpjPFbccAjUBZRkA7uNWM40v563mIcofaiIP3qbMTyU7JBH7',
            'secretKey' : 'ArCBx1AcUw9kJY7RYhnBMGdQDDd4grgkBzLg7D4uW0OypRVn1RN0SYRhZkNl9bER'
        }
        var signature = crypto.createHmac('sha256', keys['secretKey']).update(dataquerystring).digest('hex');
        var urlAccount = url + endpoint + '?'+ dataquerystring + '&signature='+signature;
        console.log(urlAccount);
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', urlAccount, true);
        ourRequest.setRequestHeader('X-MBX-APIKEY', keys['apiKey']);
        ourRequest.onload = function(){
            console.log(ourRequest.responseText);
        }
        ourRequest.send();
    }
    CreateNewOrder(){
        var url='https://api.binance.com';
        var endpoint = '/api/v3/order';
        var value = 'symbol=TRXUSDT&side=BUY&type=LIMIT&timeInForce=GTC&quantity=683.6&price=0.01609&recvWindow=20000&timestamp='+Date.now();
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
     GetTradeHistory(){
         var url = "wss://stream.binance.com:9443/ws/trxusdt@aggTrade";
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
   
    GetAllPrice(){
        var url = "wss://stream.binance.com:9443/ws/!bookTicker";
        const ws2 = new WebSocKet(url);
        
        ws2.on('message', (data: any) => {
             var all = JSON.parse(data).E;
             
            
        })
        
    }
    // AllInfo(){
    //     var trade = this.GetTradeHistory();
    //     var allprice = this.GetAllPrice();
    //     console.log(trade);
        
    //     this.broadcast("trade", "'" + trade +"'"+ "'"+allprice +"'");
    // }
    BookTicker(){
        var url  = "wss://stream.binance.com:9443/ws/!bookTicker";
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
        this.AboutAccount();
        this.GetTradeHistory();
        // this.BookTicker();
        this.onMessage("message", (client, message)=>{
            
            
        });
    }
}
