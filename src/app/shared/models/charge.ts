import { Customer } from './customer';
import { Motorized } from './motorized';
import { Local } from './local';
import { Detail } from './detail';

export class Charge {
    idcharge?:string;
    total :number;
    description:string;
    date:string;
    state:string;
    idcustomer: string;
    idmotorized: string;
    idlocal: string;
    customer?: Customer;
    motorized?: Motorized;
    local?: Local;
    details:Array<Detail>=[];
}
