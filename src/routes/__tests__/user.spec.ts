import supertest from 'supertest'
import db from '../../database'
import app from '../../index'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'

const userModel = new UserModel()
const request = supertest(app)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im9tYXIiLCJmaXJzdG5hbWUiOiJvbWFyIiwibGFzdG5hbWUiOiJvc2FtYSIsImVtYWlsIjoib21hckBnbWFpbC5jb20ifSwiaWF0IjoxNjY1NjgxNjQyfQ.AOodsZtdAU26jkitXJ0i_-K0PgKVplBGV38wjFrjcD0'

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

  describe('Test User GRUD Functions', () => {
    it('Test Create New User Route', async () => {
      const res = await request
        .post('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'mohamed',
          firstname: 'mohamed',
          lastname: 'osama',
          email: 'mohamedosama@gmail.com',
          password: '123456'
        } as User)
      expect(res.status).toBe(200)
      const { username, firstname, lastname, email } = res.body.data
      expect(username).toBe('mohamed')
      expect(firstname).toBe('mohamed')
      expect(lastname).toBe('osama')
      expect(email).toBe('mohamedosama@gmail.com')
    })

    it('Test Get All Users Route', async () => {
      const res = await request
        .get('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.length).toEqual(2)
    })

    it('Test Get One User Route', async () => {
      const res = await request
        .get(`/api/users/${omar.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.username).toBe('omar')
      expect(res.body.data.firstname).toBe('omar')
      expect(res.body.data.lastname).toBe('osama')
      expect(res.body.data.email).toBe('omar@gmail.com')
    })

    it('Test Update User Route', async () => {
      const res = await request
        .patch(`/api/users/${omar.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...omar,
          email: 'updateomar@gmail.com'
        })
      expect(res.status).toBe(200)
      // const { id, username, firstname, lastname, email } = res.body.data
      expect(res.body.data.id).toBe(omar.id)
      expect(res.body.data.username).toBe(omar.username)
      expect(res.body.data.firstname).toBe(omar.firstname)
      expect(res.body.data.lastname).toBe(omar.lastname)
      expect(res.body.data.email).toBe('updateomar@gmail.com')
    })

    it('Test DELETE User Route', async () => {
      const res = await request
        .delete(`/api/users/${omar.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(omar.id)
    })
  })
})
