import { Router } from 'express'
import * as authControllers from '../../controllers/auth.controllers'
import * as productsControllers from '../../controllers/products.controllers'
import authMiddleware from '../../middleware/auth.middleware'

const routes = Router()

routes.route('/authentacate').post(authControllers.userAuth)

routes
  .route('/')
  .get(authMiddleware, productsControllers.getAllProducts)
  .post(authMiddleware, productsControllers.createProduct)
routes
  .route('/category/:categoryName')
  .get(authMiddleware, productsControllers.getAllProductsByCategory)
routes
  .route('/:id')
  .get(authMiddleware, productsControllers.getProduct)
  .patch(authMiddleware, productsControllers.updateProduct)
  .delete(authMiddleware, productsControllers.deleteProduct)

export default routes
