import db from '../database'
import Order from '../types/order.type'

class OrderModel {
  // function to return all orders
  async getAllOrders(): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , user_id , product_id , quantity , status FROM orders`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Sorry , can not return all orders  : ${(error as Error).message}`)
    }
  }

  // function to return order for user id
  async getAllOrdersUserid(userid: number): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , user_id , product_id , quantity , status FROM orders WHERE user_id = ($1)`
      const result = await connection.query(sql, [userid])
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(
        `Sorry , can not return this orders for user  ${userid}  : ${(error as Error).message}`
      )
    }
  }

  // function to return order for product id
  async getAllOrdersProductid(productid: number): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , user_id , product_id , quantity , status FROM orders WHERE product_id = ($1)`
      const result = await connection.query(sql, [productid])
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(
        `Sorry , can not return this orders for product  ${productid}  : ${
          (error as Error).message
        }`
      )
    }
  }

  // function to create new order
  async createOrder(o: Order): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO orders (user_id , product_id , quantity , status) 
                        values ($1 , $2 , $3 , $4) 
                        returning id, user_id , product_id , quantity , status`
      const result = await connection.query(sql, [o.user_id, o.product_id, o.quantity, o.status])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Sorry , can not create this order (${o.product_id}) : ${(error as Error).message}`
      )
    }
  }

  // function to return one order
  async getOrder(id: number): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , user_id , product_id , quantity , status FROM orders WHERE id = ($1)`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Sorry , can not return this order ${id}  : ${(error as Error).message}`)
    }
  }

  // function to create new order
  async updateOrder(o: Order): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE orders  SET user_id = $1 , product_id = $2 , quantity = $3 , status = $4  
                        WHERE id = $5
                        returning id, user_id , product_id , quantity , status`
      const result = await connection.query(sql, [
        o.user_id,
        o.product_id,
        o.quantity,
        o.status,
        o.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Sorry , can not update order (${o.product_id}) : ${(error as Error).message}`
      )
    }
  }

  // function to delete one order
  async deleteOrder(id: number): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM orders WHERE id = ($1)
            returning id , user_id , product_id , quantity , status`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Sorry , can not delete order ${id}  : ${(error as Error).message}`)
    }
  }
}

export default OrderModel
