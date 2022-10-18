import db from '../../database'
import ProductModel from '../product.model'
import Product from '../../types/product.type'

const productModel = new ProductModel()

describe('Test Product Module', () => {
  describe('Test Product Functions Is Exist', () => {
    it('check if function get all products is exist', () => {
      expect(productModel.getAllProducts).toBeDefined()
    })

    it('check if function get all products by category is exist', () => {
      expect(productModel.getAllProductsByCategory).toBeDefined()
    })

    it('check if function create new Product is exist', () => {
      expect(productModel.createProduct).toBeDefined()
    })

    it('check if function get one product is exist', () => {
      expect(productModel.getProduct).toBeDefined()
    })

    it('check if function update product is exist', () => {
      expect(productModel.updateProduct).toBeDefined()
    })

    it('check if function delete product is exist', () => {
      expect(productModel.deleteProduct).toBeDefined()
    })
  })

  describe('Test Authentication', () => {
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
      price: 10000
    } as Product

    beforeAll(async () => {
      const createProductMobile = await productModel.createProduct(mobile)
      mobile.id = createProductMobile.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1;`
      await connection.query(sql)
      connection.release()
    })

    it('Test if return create new product', async () => {
      const createProductIpad = await productModel.createProduct(ipad)
      ipad.id = createProductIpad.id
      expect(createProductIpad).toEqual({
        id: createProductIpad.id,
        name: 'ipad',
        details: 'ipad details',
        category: 'apple',
        price: 10000
      } as Product)
    })

    it('Test function get all products return 2 product', async () => {
      const allProducts = await productModel.getAllProducts()
      expect(allProducts.length).toEqual(2)
    })

    it('Test function get all products by category return 2 product', async () => {
      const allProductsByCategory = await productModel.getAllProductsByCategory('apple')
      expect(allProductsByCategory.length).toEqual(2)
    })

    it('Test function get one product ', async () => {
      const getProductMobile = await productModel.getProduct(mobile.id as number)
      expect(getProductMobile.id).toBe(mobile.id)
      expect(getProductMobile.name).toBe(mobile.name)
      expect(getProductMobile.details).toBe(mobile.details)
      expect(getProductMobile.category).toBe(mobile.category)
      expect(getProductMobile.price).toEqual(20000)
    })

    it('Test function update product ', async () => {
      const getProductIpad = await productModel.updateProduct({
        ...ipad,
        name: 'ipad 10',
        details: ipad.details,
        category: ipad.category,
        price: ipad.price,
        id: ipad.id
      })
      expect(getProductIpad.id).toBe(ipad.id)
      expect(getProductIpad.name).toBe('ipad 10')
      expect(getProductIpad.details).toBe(ipad.details)
      expect(getProductIpad.category).toBe(ipad.category)
      expect(getProductIpad.price).toEqual(ipad.price)
    })

    it('Test function delete product return  product id', async () => {
      const deleteProductMobile = await productModel.deleteProduct(mobile.id as number)
      expect(deleteProductMobile.id).toBe(mobile.id)
    })
  })
})
