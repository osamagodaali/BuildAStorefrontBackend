import supertest from 'supertest'
import db from '../../database'
import app from '../../index'
import User from '../../types/user.type'
import Product from '../../types/product.type'
import Order from '../../types/order.type'
import UserModel from '../../models/user.model'
import ProductModel from '../../models/product.model'
import OrderModel from '../../models/order.model'

const userModel = new UserModel()
const productModel = new ProductModel()
const orderModel = new OrderModel()
const request = supertest(app)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im9tYXIiLCJmaXJzdG5hbWUiOiJvbWFyIiwibGFzdG5hbWUiOiJvc2FtYSIsImVtYWlsIjoib21hckBnbWFpbC5jb20ifSwiaWF0IjoxNjY1NjgxNjQyfQ.AOodsZtdAU26jkitXJ0i_-K0PgKVplBGV38wjFrjcD0'

describe('Test Orders Routes Module', () => {
  const omar = {
    username: 'omar',
    firstname: 'omar',
    lastname: 'osama',
    email: 'omar@gmail.com',
    password: '123456'
  } as User

  const mobile = {
    name: 'mobile',
    details: 'mobile details',
    category: 'apple',
    price: 20000
  } as Product

  const ipad = {
    name: 'ipad',
    details: 'ipad details',
    category: 'apple',
    price: 15000
  } as Product

  const mobileOrder = {
    user_id: 1,
    product_id: 1,
    quantity: 2,
    status: 'pendding'
  } as Order

  beforeAll(async () => {
    await userModel.createUser(omar)
    await productModel.createProduct(mobile)
    await productModel.createProduct(ipad)
    await orderModel.createOrder(mobileOrder)
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sqlOrders = `DELETE FROM orders ; ALTER SEQUENCE orders_id_seq RESTART WITH 1;`
    const sqlProducts = `DELETE FROM products ; ALTER SEQUENCE products_id_seq RESTART WITH 1;`
    const sqlusers = `DELETE FROM users ; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
    await connection.query(sqlOrders)
    await connection.query(sqlProducts)
    await connection.query(sqlusers)
    connection.release()
  })

  describe('Test Orders GRUD Functions', () => {
    it('Test Create New Order Route', async () => {
      const res = await request
        .post('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: 1,
          product_id: 2,
          quantity: 3,
          status: 'pendding'
        } as Order)
      expect(res.status).toBe(200)
      const { user_id, product_id, quantity, status } = res.body.data
      expect(user_id).toBe(1)
      expect(product_id).toBe(2)
      expect(quantity).toBe(3)
      expect(status).toBe('pendding')
    })

    it('Test Get All Orders Route', async () => {
      const res = await request
        .get('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
    })

    it('Test Get All Orders For user Route', async () => {
      const res = await request
        .get('/api/orders/user/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
    })

    it('Test Get All Orders for product Route', async () => {
      const res = await request
        .get('/api/orders/product/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(1)
    })

    it('Test Get One Order Route', async () => {
      const res = await request
        .get(`/api/orders/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.user_id).toBe(1)
      expect(res.body.data.product_id).toBe(1)
      expect(res.body.data.quantity).toBe(2)
      expect(res.body.data.status).toBe('pendding')
    })

    it('Test Update Order Route', async () => {
      const res = await request
        .patch(`/api/orders/1`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...mobileOrder,
          user_id: 1,
          product_id: 1,
          quantity: 2,
          status: 'approved',
          id: 1
        })
      expect(res.status).toBe(200)
      // const { id, user_id, product_id, quantity, status } = res.body.data
      expect(res.body.data.id).toBe(1)
      expect(res.body.data.user_id).toBe(1)
      expect(res.body.data.product_id).toBe(1)
      expect(res.body.data.quantity).toBe(2)
      expect(res.body.data.status).toBe('approved')
    })

    it('Test DELETE Order Route', async () => {
      const res = await request
        .delete(`/api/orders/2`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(2)
    })
  })
})
