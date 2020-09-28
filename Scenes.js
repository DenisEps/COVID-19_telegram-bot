const { Telegraf } = require('telegraf')

const { Markup } = Telegraf
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

class ScenesGenerator {
  nameScene() {
    const name = new Scene('name')
    name.enter((ctx) => {
      ctx.reply('Как тебя зовут?')
    })
    name.on('text', async (ctx) => {
      const name = ctx.message.text
      if (name) {
        await ctx.reply(`Привет ${name}`)
        ctx.session.name = name
        await ctx.scene.leave()
      }
    })
  }

  ageScene() {
    const age = new Scene('age')
    age.enter((ctx) => {
      ctx.reply('Твой возраст?')
    })
    age.on('text', async (ctx) => {
      const age = Number(ctx.message.text)
      if (age) {
        await ctx.reply('Ок спасибо')
        ctx.session.age = age
        await ctx.scene.leave()
      }
    })
  }

  statsScene() {
    const stats = new Scene('stats')

    stats.enter((ctx) => {
      ctx.telegram.sendMessage(ctx.chat.id,
        `<b>Привет ${ctx.message.from.first_name}</b> 👋,\nдоступные команды:\n`
        + '/help - посмотреть список доступных команд\n'
        + '/covid - выбрать категорию запроса', { parse_mode: 'HTML' })
    })

    const inlineCovidCommandKeyboard = Markup.inlineKeyboard([
      [Markup.callbackButton('Общая статистика по всему миру', 'allcountriesStats')],
      [Markup.callbackButton('Россия', 'russia'), Markup.callbackButton('США', 'us')],
      [Markup.callbackButton('Пакистан', 'pakistan'), Markup.callbackButton('Италия', 'italy')],
      [Markup.callbackButton('Другая страна', 'noCountryInList'), Markup.callbackButton('В начало', 'start')],
    ]).extra()

    stats.action('covid', (ctx) => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        'Какую статистику посмотреть?',
        inlineCovidCommandKeyboard,
      )
    })

    return stats
  }
}

module.exports = ScenesGenerator
