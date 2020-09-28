const dotenv = require('dotenv')

dotenv.config()
const { Telegraf } = require('telegraf')

const { Markup } = Telegraf
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const SceneGenerator = require('./Scenes.js')

const currScene = new SceneGenerator()
const nameScene = currScene.nameScene()
const ageScene = currScene.ageScene()

const stage = new Stage([nameScene, ageScene])

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())