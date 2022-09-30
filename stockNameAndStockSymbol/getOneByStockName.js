import { stockNameAndStockSymbolModle } from '../db/index.js'

const getOneByStockName = async (stockName) => {
  return await stockNameAndStockSymbolModle.findOne({ stockName })
}
export { getOneByStockName }
