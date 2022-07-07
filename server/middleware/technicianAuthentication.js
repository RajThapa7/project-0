const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const techAuth = async (req, res, next) => {
  // check header
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const accessToken = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET)
    // attach the user to the job routes
    req.technician = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = techAuth;
