import { Router } from 'express'
import * as authControllers from '../../controllers/auth.controllers'
import * as controllers from '../../controllers/users.controllers'
import checkVaildToken from '../../middleware/auth.middleware'

const routes = Router()

routes.route('/authentacate').post(authControllers.userAuth)

routes
  .route('/')
  .get(checkVaildToken, controllers.getAllUsers)
  .post(checkVaildToken, controllers.createUser)
routes
  .route('/:id')
  .get(checkVaildToken, controllers.getUser)
  .patch(checkVaildToken, controllers.updateUser)
  .delete(checkVaildToken, controllers.deleteUser)

export default routes
