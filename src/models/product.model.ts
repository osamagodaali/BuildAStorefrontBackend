import db from '../database'
import Product from '../types/product.type'

class ProductModel {
  // function to return all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , name , details , category , price FROM products`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Sorry , can not return all products  : ${(error as Error).message}`)
    }
  }

  // function to return all products by category
  async getAllProductsByCategory(category: string): Promise<Product[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , name , details , category , price FROM products WHERE category = ($1) `
      const result = await connection.query(sql, [category])
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(
        `Sorry , can not return all products by category : ${(error as Error).message}`
      )
    }
  }

  // function to create new product
  async createProduct(p: Product): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO products (name , details , category , price) 
                        values ($1 , $2 , $3 , $4) 
                        returning id, name , details , category , price`
      const result = await connection.query(sql, [p.name, p.details, p.category, p.price])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Sorry , can not create this product (${p.name}) : ${(error as Error).message}`
      )
    }
  }

  // function to return one product
  async getProduct(id: number): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , name , details , category , price FROM products WHERE id = ($1)`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Sorry , can not return this product ${id}  : ${(error as Error).message}`)
    }
  }

  // function to create new product
  async updateProduct(p: Product): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE products  SET name = $1 , details = $2 , category = $3 , price = $4  
                        WHERE id = $5
                        returning id, name , details , category , price`
      const result = await connection.query(sql, [p.name, p.details, p.category, p.price, p.id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Sorry , can not update product (${p.name}) : ${(error as Error).message}`)
    }
  }

  // function to delete one product
  async deleteProduct(id: number): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM products WHERE id = ($1)
            returning id , name , details , category , price`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Sorry , can not delete product ${id}  : ${(error as Error).message}`)
    }
  }
}

export default ProductModel
