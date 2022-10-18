import UserModel from '../user.model'
import ProductModel from '../product.model'
import OrderModel from '../order.model'
import db from '../../database'
import Order from '../../types/order.type'
import User from '../../types/user.type'
import Product from '../../types/product.type'

const userModel = new UserModel()
const productModel = new ProductModel()
const orderModel = new OrderModel()

describe('Test Orders Module', () => {
  describe('Test Orders Functions Is Exist', () => {
    it('check if function get all orders is exist', () => {
      expect(orderModel.getAllOrders).toBeDefined()
    })

    it('check if function get all orders for user is exist', () => {
      expect(orderModel.getAllOrdersUserid).toBeDefined()
    })

    it('check if function get all orders for product is exist', () => {
      expect(orderModel.getAllOrdersProductid).toBeDefined()
    })

    it('check if function create new order is exist', () => {
      expect(orderModel.createOrder).toBeDefined()
    })

    it('check if function get one order is exist', () => {
      expect(orderModel.getOrder).toBeDefined()
    })

    it('check if function update order is exist', () => {
      expect(orderModel.updateOrder).toBeDefined()
    })

    it('check if function delete order is exist', () => {
      expect(orderModel.deleteOrder).toBeDefined()
    })
  })

  describe('Test Orders GRUD', () => {
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

    it('Test if return create new order', async () => {
      const ipadOrder = {
        user_id: 1,
        product_id: 2,
        quantity: 3,
        status: 'pendding'
      } as Order
      const createOrderIpad = await orderModel.createOrder(ipadOrder)
      ipadOrder.id = createOrderIpad.id
      expect(createOrderIpad).toEqual({
        id: 2,
        user_id: 1,
        product_id: 2,
        quantity: 3,
        status: 'pendding'
      } as Order)
    })

    it('Test function get all orders return 2 order', async () => {
      const getAllOrders = await orderModel.getAllOrders()
      expect(getAllOrders.length).toEqual(2)
    })

    it('Test function get all orders for user return 2 order', async () => {
      const getAllOrders = await orderModel.getAllOrdersUserid(1 as number)
      expect(getAllOrders.length).toEqual(2)
    })

    it('Test function get all orders for product return 1 order', async () => {
      const getAllOrders = await orderModel.getAllOrdersProductid(2 as number)
      expect(getAllOrders.length).toEqual(1)
    })

    it('Test function get one order ', async () => {
      const getOrderMobile = await orderModel.getOrder(1 as number)
      expect(getOrderMobile.id).toBe(1)
      expect(getOrderMobile.user_id).toBe(1)
      expect(getOrderMobile.product_id).toBe(1)
      expect(getOrderMobile.quantity).toBe(2)
      expect(getOrderMobile.status).toEqual('pendding')
    })

    it('Test function update order ', async () => {
      const getOrderIpad = await orderModel.updateOrder({
        ...mobileOrder,
        user_id: 1,
        product_id: 1,
        quantity: 2,
        status: 'approved',
        id: 1
      })
      expect(getOrderIpad.id).toBe(1)
      expect(getOrderIpad.user_id).toBe(1)
      expect(getOrderIpad.product_id).toBe(1)
      expect(getOrderIpad.quantity).toBe(2)
      expect(getOrderIpad.status).toBe('approved')
    })

    it('Test function delete order return  order id', async () => {
      const deleteOrderIpad = await orderModel.deleteOrder(2 as number)
      expect(deleteOrderIpad.id).toBe(2)
    })
  })
})
