import { MenuItem } from '../data/menuData';

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  tableNumber: number | null;
  orderType: 'dine-in' | 'takeaway';
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod?: 'cash' | 'card' | 'split';
  notes?: string;
}

export interface AppState {
  orders: Order[];
  currentOrder: Order;
  dailySales: number;
  orderCount: number;
}
