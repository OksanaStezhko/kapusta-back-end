const queryString = require('query-string')
const { v4 } = require('uuid')
const axios = require('axios')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL } =
  process.env
const { User } = require('../model')

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  )
}

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = queryString.parse(urlObj.search)
  const code = urlParams.code
  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  })
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  })
  const { name, email } = userData.data
  let currentUser
  const user = await User.findOne({ email }, '_id name email password  ')
  if (!user) {
    const newUser = new User({ name, email })
    newUser.setPassword(v4())
    await newUser.save()
    currentUser = newUser
  } else {
    currentUser = user
  }

  const token = currentUser.createToken()
  await User.findByIdAndUpdate(currentUser._id, { token })

  return res.redirect(
    `${FRONTEND_URL}/authorized?token=${token}&email=${email}&name=${name}`
  )
}

module.exports = { googleAuth, googleRedirect }
