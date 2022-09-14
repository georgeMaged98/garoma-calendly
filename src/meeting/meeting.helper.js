// This function should take a user, start and end dates then it checks if the user is free during these timings
const prepareConflictFilter = (user, start, end) => {
  try {
    return {
      $or: [
        {
          invitee: user,
          start: { $lte: start },
          end: { $gte: start },
        },
        {
          invitee: user,
          start: { $lte: end },
          end: { $gte: end },
        },
        {
          invitee: user,
          start: { $gte: start },
          end: { $lte: end },
        },
        {
          inviter: user,
          start: { $lte: start },
          end: { $gte: start },
        },
        {
          inviter: user,
          start: { $lte: end },
          end: { $gte: end },
        },
        {
          inviter: user,
          start: { $gte: start },
          end: { $lte: end },
        },
      ],
    }
  } catch (err) {
    throw new Error('Something Went Wrong!')
  }
}

module.exports = {
  prepareConflictFilter,
}
