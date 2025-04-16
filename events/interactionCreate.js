const { Collection, ButtonStyle, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, getTextInputValue } = require("discord.js");
const db = require("croxydb");
const Discord = require("discord.js");
const { readdirSync } = require("fs");
const moment = require("moment");
const fs = require("fs")
module.exports = {
  name: Discord.Events.InteractionCreate,

  run: async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
      if (!interaction.guildId) return;

      readdirSync('./commands').forEach(async (f) => {
        const cmd = require(`../commands/${f}`);

        if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {


          return cmd.run(client, interaction);
        }



      });
    }

    if (interaction.isButton()) {
      const customId = interaction.customId;
      const name = customId.split("_")[0];
      const id = customId.split("_")[1];

      const idFind = (id_name) => {
        return `${id_name}_${id}`;
      }

      if (id !== "everyone" && id !== interaction.user.id) {
        
        const butonembed = new Discord.EmbedBuilder()
          .setDescription(`Bu butonu sadece (<@${id}>) kullanabilir!`)
        return interaction.reply({ embeds: [butonembed], ephemeral: true })
      }

    }

// BAŞLANGIÇ
// BAŞLANGIÇ
// BAŞLANGIÇ
// BAŞLANGIÇ
// BAŞLANGIÇ
// BAŞLANGIÇ









// SON
// SON
// SON
// SON
// SON
// SON
// SON
// SON
  }

};