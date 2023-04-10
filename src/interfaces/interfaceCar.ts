import { IAccessorie } from "./interfaceAccessorie";

export interface ICar extends Document {
    model : string;
    color : string;
    year : string;
    value_per_day : number;
    acessories : IAccessorie[]; 
}