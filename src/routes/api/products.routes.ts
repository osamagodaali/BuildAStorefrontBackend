import { Router } from 'express'
import * as authControllers from '../../controllers/auth.controllers'
import * as productsControllers from '../../controllers/products.controllers'
import checkVaildToken from '../../middleware/auth.middleware'

const routes = Router()

routes.route('/authentacate').post(authControllers.userAuth)

routes
  .route('/')
  .get(checkVaildToken, productsControllers.getAllProducts)
  .post(checkVaildToken, productsControllers.createProduct)
routes
  .route('/category/:categoryName')
  .get(checkVaildToken, productsControllers.getAllProductsByCategory)
routes
  .route('/:id')
  .get(checkVaildToken, productsControllers.getProduct)
  .patch(checkVaildToken, productsControllers.updateProduct)
  .delete(checkVaildToken, productsControllers.deleteProduct)

export default routes
