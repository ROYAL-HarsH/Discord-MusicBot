// Dependencies
const Discord = require('discord.js');
const fs = require("fs");

// Loads config.js
const config = require(`${process.cwd()}/config.js`);


bot.login(process.env.token);
-require("dotenv").config();//Loading .env
// Dependencies
const Discord = require('discord.js');
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: "?"
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });

// Loads config.js
const config = require(`${process.cwd()}/config.js`);


bot.login(process.env.token);

// Creates shard manager
const manager = new Discord.ShardingManager(`${process.cwd()}/bot.js`, {
    totalShards: "auto",
    respawn: true,
    token: config.token
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`?help`, { type: "LISTENING" });
});

//Logging in to discord
client.login(process.env.token)
// Sharding Event handler
fs.readdir(`${process.cwd()}/events/sharding`, (err, files) => {
    if (err) { throw err }
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        let event = require(`${process.cwd()}/events/sharding/${file}`);
        let eventName = file.split(".")[0];
        manager.on(eventName, event.bind(null, manager));
        delete require.cache[require.resolve(`${process.cwd()}/events/sharding/${file}`)];
    }
});

// Spawns shards
manager.spawn();


