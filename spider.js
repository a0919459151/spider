import got from 'got'
import cheerio from 'cheerio'

const replaceTextToEmpty = (string) => {
    return string.toString().replace(/[\u4e00-\u9fa5]/g, "")
}

const main = async (stockCode) => {
    const url = `https://tw.stock.yahoo.com/quote/${stockCode}`

    const page = await got.get(url).text()
    const $ = cheerio.load(page);
    const table1 = $('li[class="price-detail-item H(32px) Mx(16px) D(f) Jc(sb) Ai(c) Bxz(bb) Px(0px) Py(4px) Bdbs(s) Bdbc($bd-primary-divider) Bdbw(1px)"]')
    const table2 = $('span[class="Fw(n) Fz(16px)--mobile Fz(14px) D(f) Ai(c) C($c-trend-down)"]')

    const stockData = {
        lastPrice: replaceTextToEmpty(table1.eq(0).text()), // 股價
        chang: replaceTextToEmpty(table1.eq(8).text()), // 漲跌
        changPersentage: replaceTextToEmpty(table1.eq(7).text()), // 漲跌幅（％）
        open: replaceTextToEmpty(table1.eq(1).text()), // 開盤
        previousClose: replaceTextToEmpty(table1.eq(6).text()), // 昨收
        highest: replaceTextToEmpty(table1.eq(2).text()), // 最高
        lowest: replaceTextToEmpty(table1.eq(3).text()), // 最低
        Volume: replaceTextToEmpty(table1.eq(9).text()), // 成交量（張）
        ask: table2.eq(0).text(), // 委買價
        bid: table2.eq(5).text() // 委賣價
    }

    console.log(stockData)
}

// main(2330)
export default main