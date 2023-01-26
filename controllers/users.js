const { Conflict, BadRequest } = require('http-errors')

const { User } = require('../model')
const { sendSuccess } = require('../utils')

const signup = async (req, res) => {
  const { name, email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = new User({ name, email })
  newUser.setPassword(password)

  await newUser.save()
  sendSuccess.users(res, { name, email })
}

const signin = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email }, '_id name email password  ')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong')
  }

  const token = user.createToken()
  await User.findByIdAndUpdate(user._id, { token })
  sendSuccess.users(res, { name, email, token })
}

const signout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json({})
}

const currentUser = async (req, res) => {
  const { name, email, balance } = req.user
  sendSuccess.users(res, { name, email, balance })
}

const updateBalance = async (req, res) => {
  const { _id } = req.user
  const { balance } = req.body
  await User.findByIdAndUpdate(_id, { balance: balance })
  sendSuccess.users(res, { balance })
}

module.exports = {
  signup,
  signin,
  signout,
  currentUser,
  updateBalance,
}
