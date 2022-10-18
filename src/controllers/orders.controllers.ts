import { Request, Response, NextFunction } from 'express'
import Orders from '../models/order.model'

const mOrders = new Orders()

export const getAllOrders = async (__req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await mOrders.getAllOrders()
    res.json({
      status: 200,
      message: 'Get All Orders Successfully.',
      data: orders,
      length: orders.length
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrdersUserid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await mOrders.getAllOrdersUserid(req.params.userid as unknown as number)
    res.json({
      status: 200,
      message: 'Get All Orders Successfully.',
      data: orders,
      length: orders.length
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrdersProductid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await mOrders.getAllOrdersProductid(req.params.productid as unknown as number)
    res.json({
      status: 200,
      message: 'Get All Orders Successfully.',
      data: orders,
      length: orders.length
    })
  } catch (error) {
    next(error)
  }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await mOrders.createOrder(req.body)
    res.json({
      status: 200,
      message: 'Create New Order Successfully.',
      data: order
    })
  } catch (error) {
    next(error)
  }
}

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await mOrders.getOrder(req.params.id as unknown as number)
    res.json({
      status: 200,
      message: 'Get Order Successfully.',
      data: order
    })
  } catch (error) {
    next(error)
  }
}

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await mOrders.updateOrder(req.body)
    res.json({
      status: 200,
      message: 'Update Order Successfully.',
      data: order
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await mOrders.deleteOrder(req.params.id as unknown as number)
    res.json({
      status: 200,
      message: 'Delete Order Successfully.',
      data: order
    })
  } catch (error) {
    next(error)
  }
}
