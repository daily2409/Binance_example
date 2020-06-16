import * as express from "express";
import {connect} from "./Models/mongodb";
const app = express();
const port = 5000;
connect();  
app.listen(port);