import { Router } from 'express'
import * as authControllers from '../../controllers/auth.controllers'
import * as controllers from '../../controllers/users.controllers'
import authMiddleware from '../../middleware/auth.middleware'

const routes = Router()

routes.route('/authentacate').post(authControllers.userAuth)

routes
  .route('/')
  .get(authMiddleware, controllers.getAllUsers)
  .post(authMiddleware, controllers.createUser)
routes
  .route('/:id')
  .get(authMiddleware, controllers.getUser)
  .patch(authMiddleware, controllers.updateUser)
  .delete(authMiddleware, controllers.deleteUser)

export default routes
