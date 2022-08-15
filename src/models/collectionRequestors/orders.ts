import { ObjectId, Timestamp } from 'mongodb';
import createCollectionRequestor from '../../utils/createCollectionRequestor';

export interface OrderStatus {
  name: 'NEW' | 'IN_PROCESS' | 'DELIVERING' | 'FINISHED' | 'CANCELED';
  timestamp: Timestamp;
}

export interface Order {
  userId: ObjectId;
  cart: ObjectId[]; // items ids
  address: string;
  statuses: OrderStatus[];
  creationTimestamp: Timestamp;
}

const requestOrders = createCollectionRequestor<Order>('orders');

export default requestOrders;
