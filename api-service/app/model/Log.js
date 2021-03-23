'use strict'
const path = require('path')
const thisFileName = path.parse(__filename).name

const definition = {
  req: {
    type: Object,
    default: '',
    trim: true
  },
  res: {
    type: Object,
    default: '',
    trim: true
  },
  ext: {
    type: Object,
    default: '',
    trim: true
  }
}
const options = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: thisFileName
}
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const PostSchema = new Schema(definition, options)
  return mongoose.model('Log', PostSchema)
}
