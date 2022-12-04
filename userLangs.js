const { db } = require("./sqlite")
const { fetchTodaysRound } = require('./rounds')
const { fetchRandomLang, fetchLangById } = require('./langs')

async function createUserLang(langId, userId, cb){
  const createFormat = 'INSERT INTO user_langs(lang_id, user_id, round_id) VALUES(?,?,?) RETURNING *'
  fetchTodaysRound((currentRound) => {
    db.serialize(() => {
      db.run(createFormat, [langId, userId, currentRound.id], (err) => {
        if (err) {
          console.warn(err);
          return;
        }
  
        fetchLastUserLang(userId, cb)
      })
    })
  })
}

// Used for first time AND reroll
async function createRandomUserLang(userId, msg){
  await fetchRandomLang((lang) => {
    createUserLang(lang.id, userId, (created) => {
      console.log(formatMessage(userId, lang.name))
      msg.channel.createMessage(formatMessage(userId, lang.name))
    })
  })
}

async function createAllRandomUserLang(msg){
  // Get all user with the role in "users"
  // Loop on them and call createRandomUserLang ONLY for those
  // who don't have a lang for the current round
  // Print the result as a text in message

  await fetchLastUserLang(userId, (last) => {
    if(!!last){
      console.log('already assign to a language for this round')
      return;
    }

    //
  });
}

async function fetchLastUserLang(userId, cb) {
  const getLast = `SELECT * FROM user_langs
                   WHERE user_id = ? AND round_id = ?
                   ORDER BY id DESC LIMIT 1`;

  await fetchTodaysRound((currentRound) => {
    db.serialize(() => {
      db.get(getLast, [userId, currentRound.id], (err, row) => {
        if (err) {
          console.warn(err);
          return;
        }

        if(!row){
          console.log(`no participation for ${userId} on round ${currentRound.id}`)
          cb(row, currentRound)
        } else {
          cb(row, currentRound)
        }
  
        /* fetch le round courrant
        si pas de d'entrée dans les langues pour round courant, 
            --> dire "ne participe pas pour ce round"
        sinon retourner le même format
        */
      })
    })
  });
}

async function fetchRoundInfoForUser(userId, msg) {
  await fetchLastUserLang(userId, (currentUserLang, currentRound) =>{
    if(currentUserLang){
      fetchLangById(currentUserLang.lang_id, (lang) => {
        msg.channel.createMessage(formatMessage(userId, lang.name))
      })
    }else {
      // find a way to format user id
      msg.channel.createMessage(`${formatRound(currentRound)} <@${userId}> is not participating on this round`)
    }
  })
}

function formatMessage(userId, langName) {
  return `<@${userId}> - ${langName}`
}

function formatRound(round){
  const date = new Date(round.date)
  return `RoundId:${round.id}, day ${date.getDate()}: `
}

module.exports = { createRandomUserLang, fetchLastUserLang, fetchRoundInfoForUser }