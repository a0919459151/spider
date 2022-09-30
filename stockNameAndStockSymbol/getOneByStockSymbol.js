import { stockNameAndStockSymbolModle } from '../db/index.js'

const getOneByStockSymbol = async (stockSymbol) => {
  return await stockNameAndStockSymbolModle.findOne({ stockSymbol })
}
export { getOneByStockSymbol }
