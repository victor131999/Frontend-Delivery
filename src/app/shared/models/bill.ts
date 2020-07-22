import { Order } from './order';
export class Bill {
    idbill?: string;
    clientid:string;
    orderid:string;
    product: string;
    description:string;
    quantity:number;
    total: number;
    order:Order;
}
