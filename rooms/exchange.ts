import  WebSocKet  from  "ws";
import { Room } from "colyseus";
import  moment  from "moment";
import crypto from "crypto";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// import XMLHttpRequest from "xmlhttprequest";
export class ExchangeBinance extends Room{
    CreateNewOrder(){
        var url="https://api.binance.com";
        var endpoint = "/api/v3/order";
        var value = 
        "symbol=TRXUSDT&side=BUY&type=LIMIT&timeInForce=GTC&quantity=0.01&price=0.01637&recvWindow=2000&timestamp="+Date.now();
        var keys = {
            "akey" : 'YCbWSKGEgRGhOcGO0O6j2YTIJLZsvPpFm4o5S0CqwjkUUQP5iVEOmDtPDhRv82bA',
            "skey" : 'xLqdSBJVQHI62dMzeagU6mBUsxD7U7KeIQiyn0KO6papijaAxRPbfSgwk9LCMFBw'
        }
        var signature = crypto.createHmac('sha256', keys['skey']).update(value).digest("hex");
        var Ourl = url + endpoint + '?' + value +  '&signature=' + signature;
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('POST', Ourl, true);
        ourRequest.setRequestHeader('X-MBX-APIKEY', keys['skey']);
        ourRequest.onload = function(){
            console.log(ourRequest.responseText);
        }
        
        ourRequest.send();
    }
     GetTradeHistory(){
         var url = "wss://stream.binance.com:9443/ws/ethbtc@aggTrade";
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
        this.CreateNewOrder();
        // this.GetTradeHistory();
        // this.BookTicker();
        this.onMessage("message", (client, message)=>{
            
            
        });
    }
}
