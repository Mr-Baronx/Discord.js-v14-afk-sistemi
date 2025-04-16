const Discord = require("discord.js");
const { GatewayIntentBits } = require("discord.js")
const fs = require("fs");
const db = require('croxydb')
const config = require("./config.json");
const önerilimit = new Map()
const axios = require("axios")
const path = require("path");
const { Collection } = require("discord.js")
const { Client, EmbedBuilder, PermissionsBitField, interaction, ActionRowBuilder, MessageSelectMenu, BaseSelectMenuBuilder } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
// ------------------------------------   İNTENTLER   -------------------------------------


const Rest = require("@discordjs/rest");
const DiscordApi = require("discord-api-types/v10");

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution
  ],
});

global.client = client;
client.commands = (global.commands = []);

// ------------------------------------   SLASH KOMUTLARI  -------------------------------------
console.log(`[-] ${fs.readdirSync("./commands").length} komut algılandı.`)

for (let commandName of fs.readdirSync("./commands")) {
  if (!commandName.endsWith(".js")) return;
  const command = require(`./commands/${commandName}`);
  client.commands.push({
    name: command.name.toLowerCase(),
    description: command.description.toLowerCase(),
    options: command.options,
    dm_permission: false,
    type: 1
  });

  console.log(`[+] ${commandName} komutu başarıyla yüklendi.`)
}


// ------------------------------------   EVENTLER YÜKLENİYOR   -------------------------------------


console.log(`[-] ${fs.readdirSync("./events").length} olay algılandı.`)

for (let eventName of fs.readdirSync("./events")) {
  if (!eventName.endsWith(".js")) return;

  const event = require(`./events/${eventName}`);
  const evenet_name = eventName.split(".")[0];

  client.on(event.name, (...args) => {
    event.run(client, ...args)
  });

  console.log(`[+] ${eventName} eventi başarıyla yüklendi.`)
}

// ------------------------------------   KOMUTLAR YÜKLENİYOR   -------------------------------------




client.once("ready", async () => {
  const rest = new Rest.REST({ version: "10" }).setToken(process.env.token);
  try {
    await rest.put(DiscordApi.Routes.applicationCommands(client.user.id), {
      body: client.commands,  //
    });
  } catch (error) {
    throw error;
  }
});

client.login(process.env.token).then(() => {
  console.log(`[-] Discord API'ye istek gönderiliyor.`);
  eval("console.clear()")
}).catch(() => {
  console.log(`[x] Discord API'ye istek gönderimi başarısız.`);
});

process.on("unhandledRejection", async (error) => {
  return console.log("Sistem Bir Sorun Tespit Etti! ; " + error)
})

