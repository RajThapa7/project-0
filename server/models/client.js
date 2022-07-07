const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
      },
      email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
      },
      password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
      },
      // image: {
      //   type: String,
      //   default: "project-zero/user-generic_ni347e"
      // },
     
    

})

ClientSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

  ClientSchema.methods.createAccessJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: "5m"
      }
    )
  }

  ClientSchema.methods.createRefreshJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name},
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: "1d"
      }
    )
  }
  
  ClientSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  }
  
    module.exports = mongoose.model('Client', ClientSchema)
