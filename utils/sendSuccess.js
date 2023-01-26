const users = (res, user, status = 200) => {
  res.status(status).json({
    user,
  })
}

const categories = (res, results, message = '', status = 200) => {
  res.status(status).json({
    message: `${status}OK.` + message,
    results,
  })
}

const transactions = (
  res,
  trans,
  currentBalance,
  message = '',
  status = 200
) => {
  res.status(status).json({
    message: `${status}OK.` + message,
    trans,
    currentBalance,
  })
}

const reports = (res, results, message = '', status = 200) => {
  res.status(status).json({
    message: `${status}OK.` + message,
    results,
  })
}

module.exports = { users, categories, transactions, reports }
