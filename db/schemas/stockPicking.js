import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({

  userName: {
    type: String
  },
  cellPhone: {
    type: String,
    required: true
  },
  stockPicking: {
    type: [String],
    required: true
  }
})

export { schema }
