import supertest from 'supertest'
import app from '../app'
const server = supertest(app)


describe('SERVER BASIC TESTS', () => {

    test('Server can be started and a GET request to /healthz results in an "OK" response', async () => {
        const response = await server
            .get('/healthz')
            .send()
        expect(response.status).toBe(200)
        expect(response.text).toBe('OK')
    })

    test('Unknown endpoint returns unknown endpoint', async () => {
      const response = await server
          .get('/someunknownendpoint')
          .send()
      expect(response.status).toBe(404)
      expect(response.text).toContain('UNKNOWN ENDPOINT')
  })


})


