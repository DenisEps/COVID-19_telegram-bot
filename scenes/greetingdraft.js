
const { Telegraf } = require('telegraf')

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { leave } = Stage
const { Markup } = Telegraf

// Greeting scene
const greeting = new Scene('greeting')

greeting.enter((ctx) => {
  ctx.reply('Привет, давай познакомимся!')
  if (ctx.session.name) {
    ctx.telegram.sendMessage(
      ctx.from.id,
      `Вы настроили получение уведомлений на ${ctx.session.email}`
    )
  } else {
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
      'Введите ваш адрес электронной почты'
    )
  } else if (!ctx.session.email) {
    ctx.session.email = ctx.message.text

    ctx.telegram.sendMessage(
      ctx.from.id,
      `Спасибо, ${ctx.session.name}! Теперь я буду отправлять обновления на ${ctx.session.email}`
    )

    leave()(ctx)
  }
})

greeting.action('leave', leave())

greeting.leave((ctx) => ctx.reply('Greeting stage leave'))

module.exports = greeting

