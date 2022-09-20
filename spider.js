import got from 'got'
import cheerio from 'cheerio'

const replaceTextToEmpty = (string) => {
  return string.toString().replace(/[\u4e00-\u9fa5]/g, '')
}

const spider = async (stockSymbol) => {
  const url = `https://tw.stock.yahoo.com/quote/${stockSymbol}`

  const page = await got.get(url).text()
  const $ = cheerio.load(page)
  const stockName = $('h1[class="C($c-link-text) Fw(b) Fz(24px) Mend(8px)"]').text()
  const table1 = $('li[class="price-detail-item H(32px) Mx(16px) D(f) Jc(sb) Ai(c) Bxz(bb) Px(0px) Py(4px) Bdbs(s) Bdbc($bd-primary-divider) Bdbw(1px)"]')
  const table2 = $('div[class="D(f) Ai(c) H(28px)"]')

  const stockData = {
    stockCode: stockSymbol,
    stockName,
    info: {
      lastPrice: replaceTextToEmpty(table1.eq(0).text()), // 股價
      chang: replaceTextToEmpty(table1.eq(8).text()), // 漲跌
      changPersentage: replaceTextToEmpty(table1.eq(7).text()), // 漲跌幅（％）
      open: replaceTextToEmpty(table1.eq(1).text()), // 開盤
      previousClose: replaceTextToEmpty(table1.eq(6).text()), // 昨收
      highest: replaceTextToEmpty(table1.eq(2).text()), // 最高
      lowest: replaceTextToEmpty(table1.eq(3).text()), // 最低
      volume: replaceTextToEmpty(table1.eq(9).text()), // 成交量（張）
      ask: table2.eq(0).text(), // 委買價
      bid: table2.eq(5).text() // 委賣價
    }
  }

  // console.log(stockData)
  return stockData
}

// spider(2330)
export { spider }