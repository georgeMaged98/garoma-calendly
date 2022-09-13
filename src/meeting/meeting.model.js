const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
  inviter: {
    type: String,
  },
  invitee: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
})

const MeetingModel = mongoose.model('Meeting', meetingSchema)

module.exports = MeetingModel
