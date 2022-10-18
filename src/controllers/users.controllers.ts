import { Request, Response, NextFunction } from 'express'
import Users from '../models/user.model'

const moUsers = new Users()

export const getAllUsers = async (__req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await moUsers.getAllUsers()
    return res.json({
      status: 200,
      message: 'Get All Users Successfully.',
      data: users,
      length: users.length
    })
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await moUsers.createUser(req.body)
    return res.json({
      status: 200,
      message: 'Create New User Successfully.',
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await moUsers.getUser(req.params.id as unknown as number)
    return res.json({
      status: 200,
      message: 'Get User Successfully.',
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await moUsers.updateUser(req.body)
    return res.json({
      status: 200,
      message: 'Update User Successfully.',
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await moUsers.deleteUser(req.params.id as unknown as number)
    return res.json({
      status: 200,
      message: 'Delete User Successfully.',
      data: user
    })
  } catch (error) {
    next(error)
  }
}
