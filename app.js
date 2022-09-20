import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import { spider } from './spider.js'

const app = new Koa()
const router = new Router()

app.use(koaBody())

router.get('/', async ctx => {
  ctx.body = '首頁 123'
})

router.get('/stockData/:stockSymbol', async ctx => {
  const { stockSymbol } = ctx.params
  const result = await spider(stockSymbol)
  ctx.response.body = JSON.stringify(result)
  // console.log(result)
})

// router.post('/stockData:2330', ctx => {
//   const { tickerSymbolArray } = ctx.request.body

//   let resObj = {}
//   tickerSymbolArray.forEach(element => {
//     resObj[element] = main(element)
//   })
// })

app.use(router.routes())

app.listen(3000, () => {
  console.log('Start aerver at 3000 port ...')
})
