const dotenv = require('dotenv')

dotenv.config()

const { Telegraf } = require('telegraf')

const { Markup } = Telegraf
const { CronJob } = require('cron')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const statsScene = require('./scenes/stats')
const greetingScene = require('./scenes/greeting')
// const subscribeScene = require('./scenes/subscribe')
const { mainMenuKeyboard } = require('./keyboards')

const { enter, leave } = Stage

const {
  getCountryStats, getGeneralStats, capitalizeFirstLetter, countries,
} = require('./getStats.js')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Create scene manager
const stage = new Stage()
stage.command('cancel', leave())

// Scene registration
// stage.register(greetingScene, statsScene, subscribeScene)
stage.register(greetingScene, statsScene)

// bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())

bot.command('greet', (ctx) => ctx.scene.enter('greeting'))
bot.action('greet', (ctx) => ctx.scene.enter('greeting'))
bot.command('stats', (ctx) => ctx.scene.enter('stats'))
bot.action('stats', (ctx) => ctx.scene.enter('stats'))
// bot.command('subscribe', (ctx) => ctx.scene.enter('subscribe'))
// bot.action('subscribe', (ctx) => ctx.scene.enter('subscribe'))

bot.on('session', (ctx) => {
  console.log('Current session:', ctx.session)
})

const { formIds, daily } = require('./formIds')


// const job = new CronJob('* * * * * *', (async () => {
//   for (const id of formIds) {
//     const imgUrl = 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&h=100&q=80'
//     const res = await getGeneralStats()
//     bot.telegram.sendMessage(
//       id,
//       res,
//     )
//   }
// }), null, true, 'America/Los_Angeles')
// job.start()

// const jobDaily = new CronJob('0 9 * * *', (async () => {
//   for (const id of daily) {
//     const imgUrl = 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&h=100&q=80'
//     const res = await getGeneralStats()
//     bot.telegram.sendMessage(
//       id,
//       res,
//     )
//   }
// }), null, true, 'America/Los_Angeles')
// jobDaily.start()

bot.start((ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,
    `<b>Привет</b> 👋,\n`
    + '/help - посмотреть список доступных команд\n'
    + '/greet - приступим?', { parse_mode: 'HTML' })
})

bot.action('start', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,
    `<b>Привет</b> 👋,\n`
    + '/help - посмотреть список доступных команд\n'
    + '/greet - приступим?', { parse_mode: 'HTML' })
})

bot.help((ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,
    `<b>Привет ${ctx.message.from.first_name}</b> 👋,\nдоступные команды:\n`
    + '/help - посмотреть список доступных команд\n'
    + '/greet - познакомиться с ботом', { parse_mode: 'HTML' })
    + '/menu - главное меню'
})

bot.command('menu', (ctx) => {
  ctx.telegram.sendMessage(
    ctx.from.id,
    'Главное меню:',
    mainMenuKeyboard,
  )
})

bot.action('covid', (ctx) => {
  ctx.deleteMessage()
  ctx.scene.enter('stats')
})
// ----------- ***********


bot.launch()

module.exports = { formIds }