const { addUser, removeUser } = require('./users')
const { tryAddLang, listLangs, deleteLang, fetchRandomLang } = require('./langs')
const { initAllTables } = require('./initializer')
const { newRound, fetchTodaysRound } = require('./rounds')
const { createRandomUserLang, fetchLastUserLang, fetchRoundInfoForUser } = require('./userLangs')

require('dotenv').config()
const eris = require('eris')
const bot = new eris.Client(process.env.BOT_TOKEN)

const commandMatcher = /^!/gmi

bot.on('ready', () => {
  console.log('Ready or not, I\'m comming..');
})

bot.on('messageCreate', async(msg) => {
  if(!shouldReact(msg)) { return; }
  if(!msg.guildID){
    console.log('Private Message !')
    return
  }

  const splittedParams = msg.content.split(commandMatcher)
  if(splittedParams.length <= 1) { return; }

  const commandParams = splittedParams[1].split(' ')
  if(!commandParams)
    return;

  processCommand(commandParams, msg)
})

bot.on('error', err => {
  console.warn(err);
})

initAllTables();
bot.connect();
// fetchRandomLang((lang) => {console.log(lang)});
// fetchRandomLang((lang) => {console.log(lang)});
// fetchRandomLang((lang) => {console.log(lang)});
// fetchRandomLang((lang) => {console.log(lang)});
// fetchRandomLang((lang) => {console.log(lang)});
// fetchTodaysRound((record) => {console.log(record)})
// fetchLastUserLang('187337115800043520', (lastUserLang) => {
//   console.log(lastUserLang)
// })


// -------------

function processCommand(params, msg){
  const command = params['0']
  switch(command.toLowerCase()) {
    case 'ping': handlePing(msg); break;
    case 'help': help(msg); break;
    case 'uadd': addUser(msg.mentions[0], msg); break
    case 'udel': removeUser(msg.mentions[0], msg); break
    case 'ladd': tryAddLang(params[1], msg); break
    case 'ldel': deleteLang(params[1], msg); break
    case 'round': processRoundCommant(params, msg); break
    case 'llist': listLangs(msg); break
    default:
      msg.channel.createMessage('No method found for command: ' + command)
      help(msg);
  }
}

function processRoundCommant(params, msg){
  params.shift()
  switch((params['0'] || '').toLowerCase()){
    case 'new': newRound(msg); break;
    case 'info': fetchRoundInfoForUser((msg.mentions[0]?.id || msg.author.id), msg); break;
    case 'reroll': createRandomUserLang((msg.mentions[0]?.id || msg.author.id), msg)
    default:
      console.log(params)
  }
}

function handlePing(msg){
  msg.channel.createMessage('Pong!');
}

function help(msg){
  msg.channel.createMessage(
    '`!ping` | `!help` \n`!uadd <member>` | `udel <member>` | `ulist`\n`ladd <language>` | `ldel  <id>` | `llist`\n | `round new` | `round info` | `round reroll` |'
  )
}

function shouldReact(msg) {
  return msg.author.id != bot.user.id
}