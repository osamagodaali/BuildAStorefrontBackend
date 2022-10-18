import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Test Authentication Module', () => {
  describe('Test if exist methods', () => {
    it('should have an user authentication ', () => {
      expect(userModel.authentacate).toBeDefined()
    })
  })

  describe('Test Authentication', () => {
    const user = {
      username: 'user1',
      firstname: 'first name',
      lastname: 'last name',
      email: 'user1@gmail.com',
      password: '123456'
    } as User

    beforeAll(async () => {
      const createUser = await userModel.createUser(user)
      user.id = createUser.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
      await connection.query(sql)
      connection.release()
    })

    it('Test if return authenticated user data', async () => {
      const authUser = await userModel.authentacate(user.email, user.password as string)
      expect(authUser?.username).toBe(user.username)
      expect(authUser?.firstname).toBe(user.firstname)
      expect(authUser?.lastname).toBe(user.lastname)
      expect(authUser?.email).toBe(user.email)
    })

    it('test add wrong user login data', async () => {
      const authUser = await userModel.authentacate('test@test.com', '987655443')
      expect(authUser).toBe(null)
    })
  })
})
