const { sendSuccess } = require('../utils')
const { Category } = require('../model')

const getCategoriesBySign = async (req, res) => {
  const { signValue } = req.params
  const result = await Category.find(
    { sign: signValue },
    '_id name nameEn sign'
  )
  sendSuccess.categories(res, result)
}

const getAllCategories = async (req, res) => {
  const result = await Category.find({}, '_id name nameEn sign')
  sendSuccess.categories(res, result)
}

const addCategory = async (req, res) => {
  const result = await Category.create(req.body)
  sendSuccess.categories(res, result, 'Category added!', 201)
}

const updateNameEn = async (req, res) => {
  const { idCategory, nameEn } = req.query
  const result = await Category.findByIdAndUpdate(
    idCategory,
    { nameEn },
    { new: true }
  )
  sendSuccess.categories(res, result, 'Category updated!', 201)
}

module.exports = {
  getCategoriesBySign,
  getAllCategories,
  addCategory,
  updateNameEn,
}
