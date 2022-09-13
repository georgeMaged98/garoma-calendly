const { Router } = require('express')

const { createMeetingValidation } = require('./meeting.validation')
const { createMeeting, getMeetings } = require('./meeting.controller')
const router = Router()

router.get('/', getMeetings)

router.post('/', createMeetingValidation, createMeeting)

module.exports = router
