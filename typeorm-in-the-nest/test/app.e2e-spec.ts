import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

//TODO : 테스트를 위한 별도의 DB를 구축한다.
//TODO : 트랜잭션 설정
describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('typeorm in nest, just coding!!')
  })

  describe('hello jest', () => {
    it('two plus two is four', () => {
      expect(2 + 2).toBe(4)
    })
  })

  describe('/users', () => {
    it('/users (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/users')
      expect(res.statusCode).toBe(401)
    })

    it('/users (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users').send({
        email: 'abcd@gmail.com',
        password: '0000',
        username: 'test',
      })

      expect(res.statusCode).toBe(401)
      // expect(res.body).toBe({
      //   email: 'test@amamov.com',
      //   username: 'test',
      //   id: '419cea5a-8826-41f3-bba0-69d9e4d09eaa',
      //   createdAt: '2021-11-11T07:34:28.617Z',
      //   updatedAt: '2021-11-11T07:34:28.617Z',
      // })
    })
  })

  it('/users/login (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/users/login').send({
      email: 'abcd@gmail.com',
      password: '0000',
    })
    expect(res.statusCode).toBe(200) // 201
    console.log(res.headers)
  })
})
