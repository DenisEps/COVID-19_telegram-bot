
const { Telegraf } = require('telegraf')

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { leave } = Stage
const { Markup } = Telegraf

const { mainMenuKeyboard } = require('../keyboards')

// Greeting scene
const greeting = new Scene('greeting')

greeting.enter(async (ctx) => {
  if (ctx.session.name && ctx.session.age) {
    ctx.telegram.sendMessage(
      ctx.from.id,
      `Привет ${ctx.session.name}, мы уже познакомились)`
    )
    leave()(ctx)
  } else if (!ctx.session.name) {
    await ctx.reply('Сперва давай познакомимся!')
    ctx.telegram.sendMessage(
      ctx.from.id,
      'Как тебя зовут?'
    )
  }
})

greeting.on('text', (ctx) => {
  if (!ctx.session.name) {
    ctx.session.name = ctx.message.text
    ctx.telegram.sendMessage(
      ctx.from.id,
      `Привет ${ctx.session.name}! Сколько тебе лет?`
    )
  } else if (!ctx.session.age) {

    try {
      ctx.session.age = Number(ctx.message.text)

      if (ctx.session.age) {
        ctx.telegram.sendMessage(
          ctx.from.id,
          `Спасибо, ${ctx.session.name}! Тебе ${ctx.session.age}`
        )
        leave()(ctx)
      } else {
        ctx.reply('Меня не проведешь! Введи правильный возраст!')
        ctx.scene.reenter()
      }
    } catch (error) {
      ctx.reply('Что-то пошло не так...')
      ctx.scene.reenter()
    }
  }
})

greeting.action('leave', leave())

greeting.leave((ctx) => {
  ctx.reply('leave scene')
  ctx.telegram.sendMessage(
    ctx.from.id,
    'Главное меню:',
    mainMenuKeyboard,
  )
})

module.exports = greeting

