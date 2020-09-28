const { Telegraf } = require('telegraf')

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { leave } = Stage
const { Markup } = Telegraf

const subscribe = new Scene('subscribe')

const { mainMenuKeyboard, subscribeKeyboard } = require('../keyboards')
const { formIds, daily } = require('../formIds')

subscribe.enter((ctx) => {
  ctx.telegram.sendMessage(
    ctx.from.id,
    'Оформите подписку',
    subscribeKeyboard,
  )
})

subscribe.action('subscribesec', (ctx) => {
  formIds.push(ctx.from.id)
  leave()(ctx)
})
subscribe.action('subscribedaily', (ctx) => {
  daily.push(ctx.from.id)
  leave()(ctx)
})

subscribe.action('leave', leave())

subscribe.leave((ctx) => {
  ctx.reply('Вы подписаны')
  ctx.telegram.sendMessage(
    ctx.from.id,
    'Главное меню:',
    mainMenuKeyboard,
  )
})

module.exports = subscribe