import mongoose from 'mongoose'
import stockPicking from './schemas/stockPicking'

mongoose.connect('mongodb://localhost:27017/softbro')

const stockPickingModle = mongoose.model('stockPicking', stockPicking)

export { stockPickingModle }
