import db from '../database'
import User from '../types/user.type'
import bycrpt from 'bcrypt'
import config from '../config'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bycrpt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  // function to user authentication
  async authentacate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect()
      const sql = `SELECT password FROM users WHERE email = $1`
      const result = await connection.query(sql, [email])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordVaild = bycrpt.compareSync(`${password}${config.pepper}`, hashPassword)
        if (isPasswordVaild) {
          const userData = await connection.query(
            `SELECT id , username , firstname , lastname , email FROM users WHERE email =($1) `,
            [email]
          )
          return userData.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(`Sorry , unable to login  : ${(error as Error).message}`)
    }
  }

  // function to return all users
  async getAllUsers(): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , username , firstname , lastname , email FROM users`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Sorry , can not return all users  : ${(error as Error).message}`)
    }
  }

  // function to create new user
  async createUser(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (username , firstname , lastname , email , password) 
                        values ($1 , $2 , $3 , $4 , $5) 
                        returning id, username , firstname , lastname , email`
      const result = await connection.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        u.email,
        hashPassword(u.password)
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Sorry , can not create this user (${u.username}) : ${(error as Error).message}`
      )
    }
  }

  // function to return one user
  async getUser(id: number): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id , username , firstname , lastname , email FROM users WHERE id = ($1)`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Sorry , can not return this user ${id}  : ${(error as Error).message}`)
    }
  }

  // function to create new user
  async updateUser(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users  SET username = $1 , firstname = $2 , lastname = $3 , email = $4 , password = $5 
                        WHERE id = $6
                        returning id, username , firstname , lastname , email`
      const result = await connection.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        u.email,
        hashPassword(u.password),
        u.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Sorry , can not update user (${u.username}) : ${(error as Error).message}`)
    }
  }

  // function to delete one user
  async deleteUser(id: number): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM users WHERE id = ($1)
            returning id , username , firstname , lastname , email`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Sorry , can not delete user ${id}  : ${(error as Error).message}`)
    }
  }
}

export default UserModel
