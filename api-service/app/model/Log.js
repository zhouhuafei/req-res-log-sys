'use strict'
const path = require('path')
const thisFileName = path.parse(__filename).name

const definition = {
  req: {
    type: String,
    default: '',
    trim: true
  },
  res: {
    type: String,
    default: '',
    trim: true
  },
  ext: {
    type: String,
    default: '',
    trim: true
  }
}
const options = {
  timestamps: {
    createdAt: 'createdAt',
    updateAt: 'updateAt'
  },
  collection: thisFileName
}
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const PostSchema = new Schema(definition, options)
  return mongoose.model('Log', PostSchema)
}
