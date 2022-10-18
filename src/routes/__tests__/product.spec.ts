import supertest from 'supertest'
import db from '../../database'
import app from '../../index'
import Product from '../../types/product.type'
import UserModel from '../../models/user.model'
import ProductModel from '../../models/product.model'

const userModel = new UserModel()
const productModel = new ProductModel()
const request = supertest(app)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im9tYXIiLCJmaXJzdG5hbWUiOiJvbWFyIiwibGFzdG5hbWUiOiJvc2FtYSIsImVtYWlsIjoib21hckBnbWFpbC5jb20ifSwiaWF0IjoxNjY1NjgxNjQyfQ.AOodsZtdAU26jkitXJ0i_-K0PgKVplBGV38wjFrjcD0'

describe('Test Product Routes Module', () => {
  const labtop = {
    name: 'labtop',
    details: 'labtop details',
    category: 'apple',
    price: 25000
  } as Product

  beforeAll(async () => {
    const createProductLabtop = await productModel.createProduct(labtop)
    labtop.id = createProductLabtop.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sqlProducts = `DELETE FROM products ; ALTER SEQUENCE products_id_seq RESTART WITH 1;`
    await connection.query(sqlProducts)
    connection.release()
  })

  describe('Test Product GRUD Functions', () => {
    it('Test Create New Product Route', async () => {
      const res = await request
        .post('/api/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'tab',
          details: 'tab details',
          category: 'apple',
          price: 5000
        } as Product)
      expect(res.status).toBe(200)
      const { name, details, category, price } = res.body.data
      expect(name).toBe('tab')
      expect(details).toBe('tab details')
      expect(category).toBe('apple')
      expect(price).toEqual(5000)
    })

    it('Test Get All Products Route', async () => {
      const res = await request
        .get('/api/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
    })

    it('Test Get All Products By Category Route', async () => {
      const res = await request
        .get(`/api/products/category/${labtop.category}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
    })

    it('Test Get One product Route', async () => {
      const res = await request
        .get(`/api/products/${labtop.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.name).toBe('labtop')
      expect(res.body.data.details).toBe('labtop details')
      expect(res.body.data.category).toBe('apple')
      expect(res.body.data.price).toBe(25000)
    })

    it('Test Update Product Route', async () => {
      const res = await request
        .patch(`/api/products/${labtop.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...labtop,
          name: 'labtop games'
        })
      expect(res.status).toBe(200)
      // const { id, name, details, category, price } = res.body.data
      expect(res.body.data.id).toBe(labtop.id)
      expect(res.body.data.name).toBe('labtop games')
      expect(res.body.data.details).toBe(labtop.details)
      expect(res.body.data.category).toBe(labtop.category)
      expect(res.body.data.price).toBe(labtop.price)
    })

    it('Test DELETE Product Route', async () => {
      const res = await request
        .delete(`/api/products/${labtop.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(labtop.id)
    })
  })
})
