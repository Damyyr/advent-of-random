const { db } = require("./sqlite")
const date = new Date();

async function newRound(msg){
  await fetchLastRound((last)=>{
    if(!!last){
      const lastParsed = new Date(last.date).toLocaleDateString()
      const currentParsed = date.toLocaleDateString()
      if(lastParsed == currentParsed){
        console.log('Round on going')
        msg?.channel?.createMessage(`A round is currently on going, use \`!round info\` to see info on current round.`)
        return
      }
    }

    createRound((created)=> {
      console.log(created)
    })
  })
}

async function fetchTodaysRound(cb){
  await fetchLastRound((last) => {
    if(!last){
      // first time generation
      createRound((created)=> {
        if(cb) { cb(created)}
        return created
      }) 
      return;
    }
    const lastParsed = new Date(last.date)

    // If last date was in the past
    if(lastParsed.getUTCDate() < date.getUTCDate() && lastParsed.getUTCMonth() < date.getUTCMonth()){
      createRound((created)=> {
        if(cb) { cb(created)}
        return created
      })
    }else{
      if(cb) { cb(last)}
        return last
    }
  })
}

async function fetchLastRound(cb){
  db.serialize(() => {
    db.get('SELECT * FROM rounds ORDER BY id DESC LIMIT 1', (err, row) => {
      if (err){
        console.warn(err);
        return;
      }
      
      cb(row)
    })
  })
}

async function createRound(cb){
  db.serialize(() => {
    db.run('INSERT INTO rounds(date) VALUES(?)', date.toISOString(), (err) => {
      if (err){
        console.warn(err);
        return;
      }
      
      fetchLastRound(cb)
    })
  })
}



module.exports = { newRound, fetchTodaysRound }