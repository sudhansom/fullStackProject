import dbConnect, { MongodHelper } from './../db-helper'
import app from '../../src/app'
import request from 'supertest'

describe('user controller', ()=>{
    let dbHelper: MongodHelper

    beforeAll( async () => {
        dbHelper = await dbConnect()
    })

    afterAll( async () => {
        await dbHelper.closeDatabase()
    })

    beforeEach( async () => {
        await dbHelper.clearDatabase()
    })

    it('should create an user', async () => {
        const userPayload = {
            firstName: 'testSudhan',
            lastName: 'testPoudel',
            email: 'test@gmail.com',
            address: [],
            order: [],
        }
        const response = await request(app)
        .post('/api/v1/users')
        .send(userPayload)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('firstName', 'testSudhan')
        expect(response.body).toHaveProperty('email', 'test@gmail.com')
        expect(response.body).toHaveProperty('lastName', 'testPoudel')

    })
})