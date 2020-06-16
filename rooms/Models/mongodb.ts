import * as Mongoose from "mongoose";
let database: Mongoose.Connection;
export  const connect = ()=>{
    const uri = "mongodb://localhost:27017";
    if(database){
        return ;
    }
    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    database = Mongoose.connection;
    database.once("open", async () =>{
        console.log("connected database");
    });
    database.on("error", ()=>{
        console.log("error connected to database");
    });
};
export const disconnect = () =>{
    if(!database){
        return;
    }
    Mongoose.disconnect();
};