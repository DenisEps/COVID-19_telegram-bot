const { Telegraf } = require('telegraf')
const { Markup } = Telegraf

const mainMenuKeyboard = Markup.inlineKeyboard([
  [Markup.callbackButton('Статистика по Covid19', 'stats')],
  [Markup.callbackButton('Познакомиться', 'greet')],
  [Markup.callbackButton('Назад', 'start')]
]).extra()

const inlineCovidCommandKeyboard = Markup.inlineKeyboard([
  [Markup.callbackButton('Общая статистика по всему миру', 'allcountriesStats')],
  [Markup.callbackButton('Россия', 'russia'), Markup.callbackButton('США', 'us')],
  [Markup.callbackButton('Пакистан', 'pakistan'), Markup.callbackButton('Италия', 'italy')],
  [Markup.callbackButton('Другая страна', 'noCountryInList')],
  [Markup.callbackButton('Назад', 'leave')],
]).extra()

const backToInlineCovidCommandKeyboard = Markup.inlineKeyboard([
  [Markup.callbackButton('Назад', 'covid')],
]).extra()

// const subscribeKeyboard = Markup.inlineKeyboard([
//   [Markup.callbackButton('ТЕСТ Каждую секунду', 'subscribesec')],
//   [Markup.callbackButton('Каждый день', 'subscribedaily')],
// ]).extra()

module.exports = { mainMenuKeyboard, inlineCovidCommandKeyboard, backToInlineCovidCommandKeyboard }