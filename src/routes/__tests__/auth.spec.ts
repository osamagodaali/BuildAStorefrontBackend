import supertest from 'supertest'
import db from '../../database'
import app from '../../index'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'

const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('Test User Routes Module', () => {
  const omar = {
    username: 'omar',
    firstname: 'omar',
    lastname: 'osama',
    email: 'omar@gmail.com',
    password: '123456'
  } as User

  beforeAll(async () => {
    const createUserOmar = await userModel.createUser(omar)
    omar.id = createUserOmar.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
    await connection.query(sql)
    connection.release()
  })

  describe('Test User Authentication Functions', () => {
    it('check if get token', async () => {
      const res = await request
        .post('/api/users/authentacate')
        .set('Content-type', 'application/json')
        .send({ email: 'omar@gmail.com', password: '123456' })
      expect(res.status).toBe(200)
      const { id, email } = res.body.data
      expect(id).toBe(omar.id)
      expect(email).toBe('omar@gmail.com')
      token = res.body.token
    })

    it('check if add wrong user data', async () => {
      const res = await request
        .post('/api/users/authentacate')
        .set('Content-type', 'application/json')
        .send({ email: 'omartest@gmail.com', password: '123456' })
      expect(res.status).toBe(401)
    })
  })
})
