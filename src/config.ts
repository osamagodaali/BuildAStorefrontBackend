import dotenv from 'dotenv'

dotenv.config()

const {
  Port,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_user,
  POSTGRES_password,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
  TOKEN_TEST
} = process.env

export default {
  port: Port,
  host: POSTGRES_HOST,
  dbport: POSTGRES_PORT,
  database: NODE_ENV == 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_user,
  password: POSTGRES_password,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  userTokenSecret: TOKEN_SECRET,
  tokenTest: TOKEN_TEST
}
