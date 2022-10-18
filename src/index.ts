import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
import routes from './routes'
import config from './config'

// dotenv.config()

const PORT = config.port || 3000
// create an instance server
const app: Application = express()
app.use(express.json())
// HTTP request logger middleware
app.use(morgan('short'))
app.use(helmet())
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too Many requests from this IP, please try again after an hour'
  })
)
// add routing for / path
app.get('/', (__req: Request, res: Response) => {
  res.json({
    message: '<h1>Hello Udacity , More thanks for this course.</h1>'
  })
})

app.use('/api', routes)

app.use(errorMiddleware)
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message:
      'Sorry , you are lost , please read the API documentation to find your way back to home'
  })
})
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
