const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.updateBalance = function (balance) {
  this.balance = balance
}

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  }
  return jwt.sign(payload, SECRET_KEY)
}

const User = model('user', userSchema)

module.exports = User
