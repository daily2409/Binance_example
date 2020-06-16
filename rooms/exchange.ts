import  WebSocKet  from  "ws";
import { Room } from "colyseus";
export class ExchangeBinance extends Room{
     GetTradeHistory(){
         var url = "wss://stream.binance.com:9443/ws/adabtc@aggTrade";
        const ws = new WebSocKet(url);

        console.log(url);
        ws.on('message', (data: string) => {
            if (data) {
                var trade = JSON.parse(data); // parsing single-trade record
                
                return trade;
                
            }
        });
    }
   
    GetAllPrice(){
        var url = "wss://stream.binance.com:9443/ws/!bookTicker";
        const ws2 = new WebSocKet(url);
        ws2.on('message', (data: any) => {
            var all = JSON.parse(data);
            return all;
        })
    }
    AllInfo(){
        var trade = this.GetTradeHistory();
        var allprice = this.GetAllPrice();
        console.log(trade);
        
        this.broadcast("trade", "'" + trade +"'"+ "'"+allprice +"'");
    }
    
    
    onCreate(option) {
        console.log("Chat room created!", option);
        this.GetTradeHistory();
        this.onMessage("message", (client, message)=>{
            this.AllInfo();
            
        });
    }
}
