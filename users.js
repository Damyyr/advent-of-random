const role = process.env.ROLE_ID

module.exports = {
  async addUser(user, msg){
    if(user === undefined) { return }

    await msg.channel.guild.fetchMembers({userIDs: [user.id]}).then(
      (member) => { member[0].addRole(role) },
      () => { printUserError(msg) },
    )
  },
  
  async removeUser(user, msg){
    await msg.channel.guild.fetchMembers({userIDs: [user.id]}).then(
      (member) => { member[0].removeRole(role) },
      () => { printUserError(msg) },
    )
  }
}

function printUserError(msg){
  msg.channel.createMessage('X - Error while fetching user or attributing the role. Please check the bot has the correct permission')
}