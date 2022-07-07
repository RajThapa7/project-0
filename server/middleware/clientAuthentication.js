const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const clientAuth = async (req, res) => {
  // check header
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const accessToken = authHeader.split(' ')[1]
    const payload = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET)
    // attach the user to the job routes
    req.client = { userId: payload.userId, name: payload.name }
    throw new UnauthenticatedError('Authentication invalid')
} 
 
module.exports = clientAuth
