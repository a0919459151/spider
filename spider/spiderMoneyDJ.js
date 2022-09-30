import got from 'got'
import { load } from 'cheerio'

const spiderMoneyDJ = async () => {
  const url = 'https://www.moneydj.com/etf/eb/et305001list.djhtm?c=47'
  let page = await got.get(url).buffer()
  page = new TextDecoder('big5').decode(page)
  const $ = load(page)
  const rows = $('#oMainTable tbody tr')

  const etfDataArray = rows.toArray().map(el => {
    const $item = $(el)
    return {
      stockSymbol: $item.find('.txt_l.Td_a').text(),
      stockName: $item.find('.txt_l.Td_a_L1a').text().replace('基金', '')
    }
  })

  console.log(etfDataArray)
  return etfDataArray
}

// spiderMoneyDJ()
export default spiderMoneyDJ
