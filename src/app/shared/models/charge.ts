import { Customer } from './customer';
import { Motorized } from './motorized';
import { Detail } from './detail';

export class Charge {
    idcharge?:string;
    total :number;
    description:string;
    date:string;
    state:string;
    idcustomer: string;
    idmotorized: string;
    customer?: Customer;
    motorized?: Motorized;
    products:Array<Detail>=[];
}
