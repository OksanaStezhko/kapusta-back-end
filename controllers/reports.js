const { Transaction } = require('../model')
const { sendSuccess } = require('../utils')

const detalsTransactions = async (req, res) => {
  const { month, year, sign } = req.query
  const { _id: owner } = req.user
  const searchResult = await Transaction.find(
    { year, month, owner },
    '_id date year month description category value'
  ).populate('category')
  let result = []
  if (sign) {
    result = searchResult.filter((trans) => trans.category.sign === sign)
  } else result = searchResult

  sendSuccess.reports(res, result, 'Reports of the detals')
}

const groupByCategory = async (req, res) => {
  const { month, year, sign } = req.query
  const { _id: owner } = req.user
  const searchResult = await Transaction.find(
    { year, month, owner },
    '_id description category value'
  ).populate('category')

  const filterdResult = sign
    ? searchResult.filter((trans) => trans.category.sign === sign)
    : searchResult

  const result = filterdResult.reduce(
    (
      acc,
      { category: { _id: categoryId, name: categoryName }, description, value }
    ) => {
      const findCategory = acc.find((item) => item.categoryId === categoryId)

      if (findCategory) {
        findCategory.value = findCategory.value + value
        const findSubCategory = findCategory.subCategories.find(
          (des) => des.name === description
        )
        if (findSubCategory) {
          findSubCategory.value = findSubCategory.value + value
        } else {
          findCategory.subCategories.push({ name: description, value })
        }

        return [...acc]
      }
      return [
        ...acc,
        {
          categoryId,
          categoryName,
          value,
          subCategories: [{ name: description, value }],
        },
      ]
    },
    []
  )

  sendSuccess.reports(
    res,
    result,
    'Reports of the detals with grouping by categories and descriptions'
  )
}

const getReportByTrans = async (req, res) => {
  const { _id } = req.user
  const { sign } = req.query

  const yearNow = new Date().getFullYear()
  const result = await Transaction.find(
    { owner: _id, year: yearNow },
    '_id date year month value'
  ).populate('category')
  const filterdResult = result.filter((trans) => trans.category.sign === sign)
  const groupBy = (objArr, prop) => {
    return objArr.reduce(function (total, obj) {
      const key = obj[prop]

      if (!total[key]) {
        total[key] = []
      }
      total[key].push(obj.value)
      return total
    }, {})
  }
  const groupedByMonth = groupBy(filterdResult, 'month')
  const entries = Object.entries(groupedByMonth)
  const newData = entries.map(([key, value]) => {
    const sum = value.reduce((total, amount) => total + amount)
    const object = Object.assign(
      {},
      ...Object.entries({ key }).map(([a, b]) => ({ [b]: sum }))
    )
    return object
  })
  const finalResult = Object.assign({}, ...newData)

  sendSuccess.reports(res, finalResult, 'Year report success!')
}

module.exports = {
  detalsTransactions,
  groupByCategory,
  getReportByTrans,
}
