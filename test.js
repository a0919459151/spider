import got from 'got'
import iconv from 'iconv-lite'
import { load } from 'cheerio'

const test = async () => {
  const url = 'https://www.moneydj.com/etf/eb/et305001list.djhtm?order=4&c=47'
  let page = await got.get(url).buffer()
  page = iconv.decode(page, 'big5')
  const $ = load(page)
  const length = 42
  const table1 = $('td[class="txt_l Td_a"]')
  const table2 = $('td[class="txt_l Td_a_L1a"]')

  const etfDataArray = []

  for (let index = 0; index < length; index++) {
    const etfData = {
      stockName: table1.eq(index).text(),
      stockSymbol: table2.eq(index).text().replace('基金', '')
    }
    etfDataArray.push(etfData)
  }
  console.log(etfDataArray)
  return etfDataArray
}

