
const { Telegraf } = require('telegraf')

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const {
  getCountryStats, getGeneralStats, capitalizeFirstLetter, countries,
} = require('../getStats.js')

const { leave } = Stage
const { Markup } = Telegraf

const { mainMenuKeyboard, inlineCovidCommandKeyboard, backToInlineCovidCommandKeyboard } = require('../keyboards')

// Stats scene
const stats = new Scene('stats')

stats.enter((ctx) => {
  ctx.telegram.sendMessage(
    ctx.from.id,
    'Какую статистику посмотреть?',
    inlineCovidCommandKeyboard,
  )
})

stats.action('russia', async (ctx) => {
  ctx.deleteMessage()
  const code = ctx.match
  const res = await getCountryStats(code)
  ctx.replyWithPhoto(res.flag)
    .then(() => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        `Страна Россия:${res.message}`,
        backToInlineCovidCommandKeyboard,
      )
    })
})

stats.action('allcountriesStats', async (ctx) => {
  ctx.deleteMessage()
  const imgUrl = 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&h=100&q=80'
  const res = await getGeneralStats()
  ctx.replyWithPhoto(imgUrl)
    .then(() => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        res,
        backToInlineCovidCommandKeyboard,
      )
    })
})

stats.action('pakistan', async (ctx) => {
  ctx.deleteMessage()
  const code = ctx.match
  const res = await getCountryStats(code)
  ctx.replyWithPhoto(res.flag)
    .then(() => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        `Страна Пакистан:${res.message}`,
        backToInlineCovidCommandKeyboard,
      )
    })
})

stats.action('italy', async (ctx) => {
  ctx.deleteMessage()
  const code = ctx.match
  const res = await getCountryStats(code)
  ctx.replyWithPhoto(res.flag)
    .then(() => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        `Страна Италия:${res.message}`,
        backToInlineCovidCommandKeyboard,
      )
    })
})

stats.action('us', async (ctx) => {
  ctx.deleteMessage()
  const code = ctx.match
  const res = await getCountryStats(code)
  ctx.replyWithPhoto(res.flag)
    .then(() => {
      ctx.telegram.sendMessage(
        ctx.from.id,
        `Страна CША:${res.message}`,
        backToInlineCovidCommandKeyboard,
      )
    })
})

stats.action('noCountryInList', (ctx) => {
  ctx.deleteMessage()
  ctx.reply('Введи следующую команду, чтобы посмотреть статистику по любой другой стране\n/country <название страны>\n\nНапример:\n/country china\nИли\n/country italy\n\nПосмотреть список всех стран: /list')
})

stats.command('country', async (ctx) => {
  const country = ctx.message.text.split(' ')[1]
  try {
    const res = await getCountryStats(country)
    ctx.replyWithPhoto(res.flag)
      .then(() => {
        ctx.telegram.sendMessage(
          ctx.from.id,
          `Страна ${capitalizeFirstLetter(country)}:${res.message}`,
          backToInlineCovidCommandKeyboard,
        )
      })
  } catch (error) {
    ctx.reply('Ой, что-то пошло не так, попробуйте снова')
  }
})

stats.command('list', (ctx) => {
  ctx.telegram.sendMessage(
    ctx.from.id,
    countries,
    backToInlineCovidCommandKeyboard,
  )
})

stats.action('leave', leave())

stats.leave((ctx) => {
  ctx.reply('Stats stage leave')
  ctx.reply('leave scene')
  ctx.telegram.sendMessage(
    ctx.from.id,
    'Главное меню:',
    mainMenuKeyboard,
  )
})

module.exports = stats

