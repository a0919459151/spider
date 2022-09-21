import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import { spider } from './spider.js'

const app = new Koa()
const router = new Router()

app.use(koaBody())

router.get('/', async ctx => {
  ctx.body = 'Hello koa!'
})

router.get('/stockData/:stockSymbol', async ctx => {
  const { stockSymbol } = ctx.params
  const result = await spider(stockSymbol)
  ctx.body = result
})

router.post('/stockData', async ctx => {
  const { stockSymbolArray } = ctx.request.body
  const temp = []
  stockSymbolArray.forEach(element => {
    temp.push(spider(element))
  })
  const resObj = await Promise.all(temp)
  ctx.response.body = resObj
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('Start aerver at 3000 port ...')
})
