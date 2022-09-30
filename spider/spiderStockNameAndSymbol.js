import got from 'got'
import { load } from 'cheerio'

const spiderTwse = async () => {
  const url = 'https://www.twse.com.tw/zh/stockSearch/stockSearch'

  const page = await got.get(url).text()
  const $ = load(page)
  const length = $('tr').find('td').length

  const stockNameAndStockSymbol = []

  for (let index = 0; index < length; index++) {
    const data = $('table tr td').eq(index).text()
    const stock = {}
    stock.stockSymbol = data.replace(/\D/g, '')
    stock.stockName = data.replace(/\d/g, '')
    if (stock.stockSymbol && stock.stockName) stockNameAndStockSymbol.push(stock)
  }
  return stockNameAndStockSymbol
}

// spiderTwse()

export default spiderTwse
