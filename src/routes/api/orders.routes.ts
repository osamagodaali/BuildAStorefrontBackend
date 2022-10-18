import { Router } from 'express'
import * as authControllers from '../../controllers/auth.controllers'
import * as ordersControllers from '../../controllers/orders.controllers'
import authMiddleware from '../../middleware/auth.middleware'

const routes = Router()

routes.route('/authentacate').post(authControllers.userAuth)

routes
  .route('/')
  .get(authMiddleware, ordersControllers.getAllOrders)
  .post(authMiddleware, ordersControllers.createOrder)
routes.route('/user/:userid').get(authMiddleware, ordersControllers.getAllOrdersUserid)
routes.route('/product/:productid').get(authMiddleware, ordersControllers.getAllOrdersProductid)
routes
  .route('/:id')
  .get(authMiddleware, ordersControllers.getOrder)
  .patch(authMiddleware, ordersControllers.updateOrder)
  .delete(authMiddleware, ordersControllers.deleteOrder)

export default routes
