import { Document, Model } from "mongoose";
export interface IUsers{
    firstname: string,
    lastname: string,
    age: number,
    dateOfEntry?: Date,
    lastUpdate?: Date
} ;
export module IUsers