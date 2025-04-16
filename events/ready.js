const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")
const db = require("croxydb")

module.exports = {
  name: Discord.Events.ClientReady,

  run: async (client, message, interaction, guild) => {
    console.log(`${client.user.tag} Başarıyla Bağlandı ve aktif edildi!`);

    const activities = [
  `Created By #MR BARON`,

    ]

    setInterval(async () => {
      client.user.setPresence({ activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}` }], status: 'idle' });
    }, 1000 * 15);


  }
}