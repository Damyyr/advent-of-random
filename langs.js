const { db } = require("./sqlite")

const fetchAllLangs = async () => {
  db.serialize(() => {
    db.all(`SELECT * FROM langs`, (err, rows) => {
      if (err){
        console.log(err);
      }
      rows
    })
  })

}

async function addLang(lang, cb) {
  await fetchLang(lang, (fetched) => {
    if (!!fetched) {
      console.log('lang fetched:' + fetched)
      return;
    }

    db.serialize(() => {
      db.run('INSERT INTO langs(name) VALUES(?) RETURNING *', lang, (err) => {
        if (err) {
          console.warn(err);
          return;
        }

        // refetch the row passing the initial callback
        fetchLang(lang, cb)
      })
    })
  })
}

async function fetchRandomLang(cb){
  db.serialize(() => {
    db.get('SELECT * FROM langs ORDER BY random() LIMIT 1', (err, row) => {
      if (err){
        console.warn(err);
        return;
      }
      
      cb(row)
    })
  })
}

async function fetchLang(lang, cb) {
  db.serialize(() => {
    db.get('SELECT * FROM langs l where l.name like ?', lang, (err, row) => {
      if (err){
        console.warn(err);
        return;
      }
      
      cb(row)
    })
  })
}

async function fetchLangById(langId, cb) {
  db.serialize(() => {
    db.get('SELECT * FROM langs l where l.id = ?', langId, (err, row) => {
      if (err){
        console.warn(err);
        return;
      }
      
      cb(row)
    })
  })
}

async function deleteLang(langId, msg) {
  await fetchLangById(langId, (fetched) => {
    if(!fetched){
      msg.channel.createMessage(`${langId} not found`)
      return;
    } 

    db.serialize(() => {
      db.run('DELETE from langs WHERE id = ?', langId, (err) => {
        if (err){
          console.log(err);
          return;
        }

        msg.channel.createMessage(`${fetched.name} deleted`)
      })
    })
  })
}

async function tryAddLang(lang, msg) {
  await addLang(lang, (created) => {
    if(!created){
      msg.channel.createMessage(`${lang} already there`)
      return;
    }

    msg.channel.createMessage(`Lang: ${lang} added`)
  })
}

const listLangs = async (msg) => {
  db.all(`SELECT * FROM langs ORDER BY rank`, (err, rows) => {
    if (err){
      console.log(err);
      return;
    }
    
    var message = rows.map(lang => `${lang.id}: ${lang.name} \`|\` rank: ${lang.rank || '(no data)'} usage: ${lang.usage || ''}%`).join('\n')
    msg.channel.createMessage(message)
  })

}

module.exports = { tryAddLang, listLangs, deleteLang, fetchRandomLang, fetchLangById }