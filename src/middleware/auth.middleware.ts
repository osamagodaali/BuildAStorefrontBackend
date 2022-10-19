import { Request, Response, NextFunction } from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'
import Error from '../interfaces/error.interface'

const checkVaildToken = async (req: Request, __res: Response, next: NextFunction) => {
  try {
    const authorizationHeader : string | undefined = req.headers.authorization
    const token : string = authorizationHeader ? authorizationHeader.split(' ')[1] : ''
    const userToken = jwt.verify(token, config.userTokenSecret as unknown as string)
    if (userToken) {
      next()
    } else {
        const error: Error = new Error('login error : please try again')
        error.status = 401
        next(error)
    }
  } catch (err) {
    const error: Error = new Error('login error : please try again')
    error.status = 401
    next(error)
  }
}

export default checkVaildToken