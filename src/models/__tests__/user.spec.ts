import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Test User Module', () => {
  describe('Test User Functions Is Exist', () => {
    it('check if function get all users is exist', () => {
      expect(userModel.getAllUsers).toBeDefined()
    })

    it('check if function create new user is exist', () => {
      expect(userModel.createUser).toBeDefined()
    })

    it('check if function get one user is exist', () => {
      expect(userModel.getUser).toBeDefined()
    })

    it('check if function update user is exist', () => {
      expect(userModel.updateUser).toBeDefined()
    })

    it('check if function delete user is exist', () => {
      expect(userModel.deleteUser).toBeDefined()
    })
  })

  describe('Test Authentication', () => {
    const mohamed = {
      username: 'mohamed',
      firstname: 'mohamed',
      lastname: 'osama',
      email: 'mohamed@gmail.com',
      password: '123456'
    } as User

    const kaylee = {
      username: 'kaylee',
      firstname: 'kaylee',
      lastname: 'osama',
      email: 'kaylee@gmail.com',
      password: '123456'
    } as User

    beforeAll(async () => {
      const createUserMohamed = await userModel.createUser(mohamed)
      mohamed.id = createUserMohamed.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
      await connection.query(sql)
      connection.release()
    })

    it('Test if return new user data', async () => {
      const createUserKaylee = await userModel.createUser(kaylee)
      kaylee.id = createUserKaylee.id
      expect(createUserKaylee).toEqual({
        id: kaylee.id,
        username: 'kaylee',
        firstname: 'kaylee',
        lastname: 'osama',
        email: 'kaylee@gmail.com'
      } as User)
    })

    it('Test function get all users return 2 users', async () => {
      const allUsers = await userModel.getAllUsers()
      expect(allUsers.length).toEqual(2)
    })

    it('Test function get one user ', async () => {
      const getUser2 = await userModel.getUser(mohamed.id as number)
      expect(getUser2.id).toBe(mohamed.id)
      expect(getUser2.username).toBe(mohamed.username)
      expect(getUser2.firstname).toBe(mohamed.firstname)
      expect(getUser2.lastname).toBe(mohamed.lastname)
      expect(getUser2.email).toBe(mohamed.email)
    })

    it('Test function update user ', async () => {
      const getUserKaylee = await userModel.updateUser({
        ...kaylee,
        username: 'kaylee osama',
        firstname: kaylee.firstname,
        lastname: kaylee.lastname,
        email: kaylee.email,
        id: kaylee.id
      })
      expect(getUserKaylee.id).toBe(kaylee.id)
      expect(getUserKaylee.username).toBe('kaylee osama')
      expect(getUserKaylee.firstname).toBe(kaylee.firstname)
      expect(getUserKaylee.lastname).toBe(kaylee.lastname)
      expect(getUserKaylee.email).toBe(kaylee.email)
    })

    it('Test function delete user return  user id', async () => {
      const deleteUserMohamed = await userModel.deleteUser(mohamed.id as number)
      expect(deleteUserMohamed.id).toBe(mohamed.id)
    })
  })
})
