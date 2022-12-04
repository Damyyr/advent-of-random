const { db, checkTableExists } = require("./sqlite")
const fs = require('fs')
const { parse } = require('csv-parse')
const datasetPath = './datasets/languages.csv'

async function initAllTables(){
  Promise.all([initLangsTable(), initRoundsTable()]);
  await initUserLangsTable()
}

async function initRoundsTable(){
  const createTable = `CREATE TABLE IF NOT EXISTS rounds(
    id INTEGER PRIMARY KEY,
    date DATE DEFAULT (datetime('now','localtime')) NOT NULL
  )`

  // This part could be moved in its proper method
  db.serialize(() => {
    db.run(createTable, (err) => {
      if(err){
        console.warn(err)
        return;
      }
    })
  })
}

async function initUserLangsTable(){
  const createTable = `CREATE TABLE IF NOT EXISTS user_langs(
    id INTEGER PRIMARY KEY,
    lang_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    round_id INTEGER NOT NULL,

    FOREIGN KEY (lang_id) REFERENCES langs(lang_id)
              ON DELETE NO ACTION ON UPDATE NO ACTION,

    FOREIGN KEY (round_id) REFERENCES rounds(round_id)
              ON DELETE NO ACTION ON UPDATE NO ACTION
  )`

  db.serialize(() => {
    db.run(createTable, (err) => {
      if(err){
        console.warn(err)
        return;
      }
    })
  })
}

async function initLangsTable(){
  const createTable = `CREATE TABLE IF NOT EXISTS langs(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    rank INTEGER NULL,
    usage REAL NULL
  )`

  checkTableExists('langs', (exists) => {
    if(exists) {
      return;
    } else {
      db.serialize(() => {
        db.run(createTable, (err) => {
          if(err){
            console.warn(err)
            return;
          }

          populateLangsTable()
        })
      })
    }
  })
}

async function populateLangsTable() {
  const rowFormat = '(?,?,?)'
  const insertCommand = `INSERT INTO langs(rank,name,usage) VALUES ${rowFormat}`

  fs.createReadStream(datasetPath)
    .pipe(parse({from_line: 2}))
    .on('data', (row) => {

      db.run(insertCommand, row, (err) => {
        if(err){
          console.warn(err)
          return;
        }
      })
      // console.log(row)
    })
    .on('end', () => { console.log('end of csv file') })
}

module.exports = { initAllTables }