import { Customer } from './customer';
export class Bill {
    idbill?: string;
    date: string;
    customerid:string;
    orderid:string;
    product: string;
    description:string;
    quantity:number;
    total: number;
    customer:Customer;
}
