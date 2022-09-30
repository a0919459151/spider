import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import { spiderYahooFinance } from './spider/spiderYahooFinance.js'
import { getOneByStockName } from './stockNameAndStockSymbol/getOneByStockName.js'
import { getOneByStockSymbol } from './stockNameAndStockSymbol/getOneByStockSymbol.js'

const app = new Koa()
const router = new Router()

app.use(koaBody())
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
  })

router.get('/', async ctx => {
  ctx.body = 'Hello koa!'
})

router.get('/stockData/:stockSymbol', async ctx => {
  const { stockSymbol } = ctx.params
  const result = await spiderYahooFinance(stockSymbol)
  ctx.body = result
})

router.post('/stockData', async ctx => {
  const { stockSymbolArray } = ctx.request.body
  const temp = []
  stockSymbolArray.forEach(element => {
    temp.push(spiderYahooFinance(element))
  })
  const resObj = await Promise.all(temp)
  ctx.body = resObj
})

// router.get('/stockPicking/:cellPhone', async ctx => {
  
// })

router.get('/getOneBystockName/:stockName', async ctx => {
  const { stockName } = ctx.params
  const resObj = await getOneByStockName(stockName)
  ctx.body = resObj
})

router.get('/getOneBystockSymbol/:stockSymbol', async ctx => {
  const { stockSymbol } = ctx.params
  const resObj = await getOneByStockSymbol(stockSymbol)
  ctx.body = resObj
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('Start aerver at 3000 port ...')
})
