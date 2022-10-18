import { Pool } from 'pg'
import config from '../config'

const pool = new Pool({
  port: parseInt(config.dbport as string, 10),
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  max: 4
})

pool.on('error', (error: Error) => {
  console.error(error.message)
})

export default pool
