import { Request, Response, NextFunction } from 'express'
import Users from '../models/user.model'
import config from '../config'
import jwt from 'jsonwebtoken'

const moUsers = new Users()

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const user = await moUsers.authentacate(email, password)
    const token = jwt.sign({ user }, config.userTokenSecret as unknown as string)
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'Sorry , email and password do not match , try again '
      })
    }
    res.json({
      status: 200,
      message: 'User authenticated Successfully.',
      data: user,
      token: token
    })
  } catch (error) {
    next(error)
  }
}
