import pool from '../config/database';
import { Order as OrderInterface } from 'shared/types';

interface CreateOrderData {
  term: number;
  amount: number;
}

class Order {
  static async create(orderData: CreateOrderData): Promise<OrderInterface> {
    const { term, amount } = orderData;
    const query = `
      INSERT INTO orders (term, amount, status)
      VALUES ($1, $2, 'pending')
      RETURNING *
    `;
    
    const result = await pool.query(query, [term, amount]);
    const row = result.rows[0];
    
    return {
      id: row.id,
      term: row.term,
      amount: parseFloat(row.amount),
      timestamp: row.timestamp,
      status: row.status
    };
  }

  static async findAll(): Promise<OrderInterface[]> {
    const query = 'SELECT * FROM orders ORDER BY timestamp DESC';
    const result = await pool.query(query);
    
    return result.rows.map(row => ({
      id: row.id,
      term: row.term,
      amount: parseFloat(row.amount),
      timestamp: row.timestamp,
      status: row.status
    }));
  }

  static async findById(id: string): Promise<OrderInterface | null> {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      term: row.term,
      amount: parseFloat(row.amount),
      timestamp: row.timestamp,
      status: row.status
    };
  }
}

export default Order;
