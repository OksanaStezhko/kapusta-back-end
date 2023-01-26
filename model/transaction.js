const { Schema, SchemaTypes, model } = require('mongoose')

const transactionSchema = Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: 'category',
      required: [true, 'Id of category is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date of category is required'],
      default: Date.now(),
    },
    year: {
      type: Number,
    },
    month: {
      type: Number,
    },
    day: {
      type: Number,
    },
    description: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
)
transactionSchema.methods.setDetalsDate = function () {
  this.year = this.date.getFullYear()
  this.month = this.date.getMonth()
  this.day = this.date.getDate()
}

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
