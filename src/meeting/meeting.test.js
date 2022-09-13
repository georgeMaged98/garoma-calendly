const request = require('supertest')
const assert = require('assert')
const createServer = require('../config/server')
const mongoose = require('mongoose')
const MeetingModel = require('./meeting.model')

const server = createServer()

jest.setTimeout(10000)
beforeEach((done) => {
  mongoose.connect(
    'mongodb+srv://admin-george:1234@cluster0.shird.mongodb.net/Calendly-test?retryWrites=true&w=majority',
    () => done()
  )
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

describe('POST /meetings', () => {
  test('create successful meeting', (done) => {
    request(server)
      .post('/meetings')
      .send({
        inviter: '1234',
        invitee: '5678',
        date: '2022-10-11',
        startTime: '12:00',
        endTime: '14:00',
      })
      .expect(201)
      .then(async (res) => {
        assert(res.body.data.inviter === '1234')

        const meeting = await MeetingModel.findById(res.body.data._id)
        assert(meeting !== null)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('POST /meetings', () => {
  test('create meeting that conflicts with another meeting', (done) => {
    MeetingModel.create({
      inviter: '1234',
      invitee: '5678',
      start: '2022-10-11T12:00:00.000Z',
      end: '2022-10-11T14:00:00.000Z',
    }).then((doc) => {
      request(server)
        .post('/meetings')
        .send({
          inviter: '5678',
          invitee: '2222',
          date: '2022-10-11',
          startTime: '13:00',
          endTime: '16:00',
        })
        .expect(400)
        .then(async (res) => {
          const allMeetings = await MeetingModel.find({})
          assert(allMeetings.length === 1)
          done()
        })
        .catch((err) => done(err))
    })
  })
})
