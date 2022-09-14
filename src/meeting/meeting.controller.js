const MeetingModel = require('./meeting.model')
const LogicError = require('../errors/LogicError')

const createMeeting = async (req, res, next) => {
  try {
    const { inviter, invitee, date, startTime, endTime } = req.body

    const [year, month, day] = date.split('-')
    const [startHours, startMins] = startTime.split(':')
    const [endHours, endMins] = endTime.split(':')

    const start = new Date(
      year,
      month - 1,
      day,
      Number(startHours) + 2, // Added Two Hours to compensate UTC difference
      startMins
    )
    const end = new Date(year, month - 1, day, Number(endHours) + 2, endMins) // Added Two Hours to compensate UTC difference

    // Check if inviter is free at this time
    const inviterMeetingsPromise = MeetingModel.find({
      $or: [
        {
          invitee: inviter,
          start: { $lte: start },
          end: { $gte: start },
        },
        {
          invitee: inviter,
          start: { $lte: end },
          end: { $gte: end },
        },
        {
          invitee: inviter,
          start: { $gte: start },
          end: { $lte: end },
        },
        {
          inviter: inviter,
          start: { $lte: start },
          end: { $gte: start },
        },
        {
          inviter: inviter,
          start: { $lte: end },
          end: { $gte: end },
        },
        {
          inviter: inviter,
          start: { $gte: start },
          end: { $lte: end },
        },
      ],
    })

    // Check if invitee is free at this time
    const inviteeMeetingsPromise = MeetingModel.find({
      $or: [
        {
          invitee: invitee,
          start: { $lte: start },
          end: { $gte: start },
        },
        {
          invitee: invitee,
          start: { $lte: end },
          end: { $gte: end },
        },
        {
          invitee: invitee,
          start: { $gte: start },
          end: { $lte: end },
        },
        {
          inviter: invitee,
          start: { $lte: start },
          end: { $gte: start },
        },
        {
          inviter: invitee,
          start: { $lte: end },
          end: { $gte: end },
        },
        {
          inviter: invitee,
          start: { $gte: start },
          end: { $lte: end },
        },
      ],
    })

    const [inviterMeetings, inviteeMeetings] = await Promise.all([
      inviterMeetingsPromise,
      inviteeMeetingsPromise,
    ])
    if (inviteeMeetings.length > 0)
      throw new LogicError(
        'Invitee is not free at the mentioned timings, Please pick another time!'
      )

    if (inviterMeetings.length > 0)
      throw new LogicError(
        'Inviter is not free at the mentioned timings, Please pick another time!'
      )

    // Check Date is in the future
    const today = new Date()
    if (start < today) throw new LogicError('Start Date Must Be In The Future!')

    // Check Start Date After End Date
    if (start > end) throw new LogicError('Start Date Must Be Before End Date!')

    // Create Meeting
    const newMeeting = {
      inviter,
      invitee,
      start,
      end,
    }

    const createdMeeting = await MeetingModel.create(newMeeting)
    return res.status(201).send({
      message: 'Meeting Created Successfully!!',
      data: createdMeeting,
    })
  } catch (err) {
    return next(err)
  }
}

const getMeetings = async (req, res, next) => {
  try {
    const { userId } = req.query
    if (!userId) throw new LogicError('userId Field Not Found!')

    const meetings = await MeetingModel.find(
      {
        $or: [
          {
            inviter: userId,
          },
          {
            invitee: userId,
          },
        ],
      },
      '_id start end inviter invitee'
    )

    return res.send({
      data: meetings,
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = { createMeeting, getMeetings }
