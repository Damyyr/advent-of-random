const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/sqlite3.db', (err) => {
  if(err) {
    return console.error(err.message);
  }
})

  const closeDb = (db) => {
    db.close((err) => {
      if(err) {
        return console.error(err.message);
      }

      console.log('db connection closed')
    })
  }

  // const initDb = () => {
  //   const createTable = `CREATE TABLE IF NOT EXISTS langs(
  //       id INTEGER PRIMARY KEY,
  //       name TEXT NOT NULL
  //     )`

  //   const langs = ['Python', 'Java', 'Bash']
  //   const placeholders = langs.map((lang) => '(?)').join(',');
  //   const insertLang = `INSERT INTO langs(name) VALUES ${placeholders}`

  //   db.serialize((err) => {
  //     db.run(createTable).run(insertLang, langs, (err) => {
  //       if(err){
  //         console.warn(err)
  //       }

  //       console.log(`inserted? ${placeholders}, ${langs}`)
  //     })

  //     if(err){
  //       console.warn(err)
  //     }
  //   })

  //   // closeDb(db)
  // }

  async function checkTableExists(tableName, cb){
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name=?", tableName, (err, result) => {
      if(err) {
        console.warn(err)
        return cb(false)
      }
  
      cb(!!result)
    })
  }

  module.exports = { db, closeDb, checkTableExists }