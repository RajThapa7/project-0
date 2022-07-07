const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const TechnicianSchema = new mongoose.Schema({
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
      occupation:{
          type: String,
          enum: ['plumber', 'electrician', 'both'],
          required: [true, 'Please choose an occupation' ]
      },
      experience:{
        type: String,
        enum: ['0-6 months', '1-2 years', '2-5 years', '5+ years'],
        required: [true, 'Please provide experience' ]
    },
    image: {
      type: String,
      default: "project-zero/user-generic_ni347e"
    },

})

TechnicianSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

  TechnicianSchema.methods.createAccessJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: "5m"
      }
    )
  }
  
  TechnicianSchema.methods.createRefreshJWT = function () {
    return jwt.sign(
      { userId: this._id},
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: "1d"
      }
    )
  }

  TechnicianSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  }
  
    module.exports = mongoose.model('Technician', TechnicianSchema)
