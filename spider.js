import got from 'got'
import { load } from 'cheerio'
import moment from 'moment-timezone'

const spiderYahooFinance = async (stockSymbol) => {
  const url = `https://tw.stock.yahoo.com/quote/${stockSymbol}`

  const page = await got.get(url).text()
  const $ = load(page)
  const stockName = $('h1[class="C($c-link-text) Fw(b) Fz(24px) Mend(8px)"]').text()
  const table1 = $('.price-detail-item')
  const table2 = $('div[class="D(f) Ai(c) H(28px)"]')

  const changeEl = table1.eq(8).children(':last-child')
  let change = changeEl.text()
  let changePersentage = table1.eq(7).children(':last-child').text()
  if (changeEl.hasClass('C($c-trend-down)')) {
    change = '-' + change
    changePersentage = '-' + changePersentage
  }

  const stockData = {
    stockCode: stockSymbol,
    stockName,
    info: {
      lastPrice: table1.eq(0).children(':last-child').text(), // 股價
      change, // 漲跌
      changePersentage, // 漲跌幅（％）
      open: table1.eq(1).children(':last-child').text(), // 開盤
      previousClose: table1.eq(6).children(':last-child').text(), // 昨收
      highest: table1.eq(2).children(':last-child').text(), // 最高
      lowest: table1.eq(3).children(':last-child').text(), // 最低
      volume: table1.eq(9).children(':last-child').text(), // 成交量（張）
      ask: table2.eq(0).text(), // 委買價
      bid: table2.eq(5).text(), // 委賣價
      time: moment.tz('Asia/Taipei').format('mm:ss')
    }
  }

  // console.log(stockData)
  return stockData
}

// spiderYahooFinance('2330')
export { spiderYahooFinance }
