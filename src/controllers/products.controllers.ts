import { Request, Response, NextFunction } from 'express'
import Products from '../models/product.model'

const mProducts = new Products()

export const getAllProducts = async (__req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await mProducts.getAllProducts()
    res.json({
      status: 200,
      message: 'Get All Products Successfully.',
      data: products,
      length: products.length
    })
  } catch (error) {
    next(error)
  }
}

export const getAllProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await mProducts.getAllProductsByCategory(
      req.params.categoryName as unknown as string
    )
    res.json({
      status: 200,
      message: 'Get All Products By Category Successfully.',
      data: products,
      length: products.length
    })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await mProducts.createProduct(req.body)
    res.json({
      status: 200,
      message: 'Create New Product Successfully.',
      data: product
    })
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await mProducts.getProduct(req.params.id as unknown as number)
    res.json({
      status: 200,
      message: 'Get Product Successfully.',
      data: product
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await mProducts.updateProduct(req.body)
    res.json({
      status: 200,
      message: 'Update Product Successfully.',
      data: product
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await mProducts.deleteProduct(req.params.id as unknown as number)
    res.json({
      status: 200,
      message: 'Delete Product Successfully.',
      data: product
    })
  } catch (error) {
    next(error)
  }
}
