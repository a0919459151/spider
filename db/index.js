import mongoose from 'mongoose'
import stockNameAndStockSymbol from './schemas/stockNameAndStockSymbol.js'
import stockPicking from './schemas/stockPicking.js'

mongoose.connect('mongodb://localhost:27017/softbro', () => {
  console.log('connect mongodb ...')
})

const stockNameAndStockSymbolModle = mongoose.model('stockNameAndStockSymbol', stockNameAndStockSymbol)
const stockPickingModle = mongoose.model('stockPicking', stockPicking)

export { stockNameAndStockSymbolModle, stockPickingModle }
