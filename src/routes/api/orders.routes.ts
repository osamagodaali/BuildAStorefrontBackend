import { Router } from 'express'
import * as authControllers from '../../controllers/auth.controllers'
import * as ordersControllers from '../../controllers/orders.controllers'
import checkVaildToken from '../../middleware/auth.middleware'

const routes = Router()

routes.route('/authentacate').post(authControllers.userAuth)

routes
  .route('/')
  .get(checkVaildToken, ordersControllers.getAllOrders)
  .post(checkVaildToken, ordersControllers.createOrder)
routes.route('/user/:userid').get(checkVaildToken, ordersControllers.getAllOrdersUserid)
routes.route('/product/:productid').get(checkVaildToken, ordersControllers.getAllOrdersProductid)
routes
  .route('/:id')
  .get(checkVaildToken, ordersControllers.getOrder)
  .patch(checkVaildToken, ordersControllers.updateOrder)
  .delete(checkVaildToken, ordersControllers.deleteOrder)

export default routes
