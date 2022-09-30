import { stockNameAndStockSymbolModle } from '../db/index.js'
import spiderTwse from '../spider/spiderStockNameAndSymbol.js'
import spiderMoneyDJ from '../spider/spiderMoneyDJ.js'

async function createCollection () {
  const stocks = await spiderTwse()
  const etfs = await spiderMoneyDJ()
  await stockNameAndStockSymbolModle.collection.drop()
  await stockNameAndStockSymbolModle.create(stocks.concat(etfs))
}
createCollection()
export { createCollection }
