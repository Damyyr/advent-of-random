# Advent of random 
## The dream
_Have you ever had a dreams that's.. that you hum.. you had.. you'd you would you could you'd do.. you would you want you.. you could do so.. you wo.. you'd do you cou.. you.. you want you want him it to do you so much you could do anything?_

---


## The Bot
- SQlite3 with a file DB
- [Eris](https://www.npmjs.com/package/eris)
- lots of scotch tape
### Goal
You want to do the [advent of code](https://adventofcode.com/) challenge but you don't know with which language you should do?

Say. No. More.


Each day (allegedly) you receive a message on your discord server informing you you're next programming language you will use to make the daily advent of code challenge!

Subscribe anytime and you will be in the next round, unsubscribe and you will skip that next round.
### Installation
You will have to create a bot on discord using the [dev portal](https://discord.com/developers/applications).

Get the bot's `clientID` and the permission you want it to have, then authenticate it with

`https://discord.com/api/oauth2/authorize?client_id=<clientID>&permissions=<permission>&scope=bot%20applications.commands` 

`npm run start` using it on your localhost
### Commands
- Help
- round
  - new
  - info [`@user`]
  - reroll [`@user`]: Get a language / get another
- llist: List all languages with their ID
- ladd <`lang`>: Add this lang to the list to the DB
- ldel <`langID`>: Remove this lang from the DB
- uadd <`@user`>: subscribe (add the defined role to that user)
- udel <`@user`>: unsubscribe (remove the role from that user)
## Challenges
That are my resolutions using this bot.

For -I think- a better ressource management and to not overload this project unnecessarily, each year will have a submodule where all necessary libraries/packages will be installed. These package will probably all be at the root of the year folder as we don't know if the same will could appear more than once.

## TODOs
### General
- [ ] Track non-participating player
- [ ] Get all the user from a role, and use a cron job to notify them all each day
- [ ] Allow multiple server on the same DB
    - [ ] Register where the bot is called from
    - [ ] Adapt tables && contextutualize the command/request
    - [ ] Add commande to configure (i.e: roleID)
- [ ] Refactor all files to use promises
- [ ] Have a better helper
- [ ] Add a docker image?


### Commands
- [ ] Print stats
- [ ] Deprecate `reroll` for a better name