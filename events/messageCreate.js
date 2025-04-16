const { EmbedBuilder, Events } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");

module.exports = {
  name: Events.MessageCreate,

  run: async (client, message) => {
    if (message.author.bot) return; 

    if (!message.guild) return; 

    if (message.mentions.users.size > 0) {
      for (const [userId, user] of message.mentions.users) {
        const afkData = db.get(`afk_${userId}`);
        if (afkData) {
          if (afkData.bildirim) {
          
            try {
              await message.delete();

              const embed = new EmbedBuilder()
                .setColor("#2b2d31")
                .setDescription(`${config.emojis.warning} **${user.tag}** şu anda AFK, etiket atamazsın!\n\n${config.emojis.info} **Sebep:** ${afkData.sebep}\n${config.emojis.time} **Süre:** <t:${Math.floor(afkData.time / 1000)}:R>`)
                .setFooter({ text: "AFK Sistemi" })
                .setTimestamp();

              await message.channel.send({ content: `${message.author}`, embeds: [embed] });
            } catch (err) {
              console.error("Mesaj silinirken hata oluştu:", err);
            }
          }

        }
      }
    }


    const userAfkData = db.get(`afk_${message.author.id}`);
    if (userAfkData) {
      
      const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setDescription(`${config.emojis.success} **${message.author}** AFK modundan çıktın!\n\n${config.emojis.info} **AFK Süren:** <t:${Math.floor(userAfkData.time / 1000)}:R>`)
        .setFooter({ text: "AFK Sistemi" })
        .setTimestamp();

      await message.reply({ embeds: [embed] });

      
      db.delete(`afk_${message.author.id}`);

      
      try {
        if (message.member && message.member.manageable) {
          await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
        }
      } catch (err) {
        console.error("Nickname düzeltme hatası:", err);
      }
    }

    if (await db.get(`afk_${message.author.id}`)) {
      const afkDate = db.fetch(`afkDate_${message.author.id}`);
      const sebep = db.fetch(`afk_${message.author.id}`);

      if (afkDate && sebep) {
        const dateEmbed = new EmbedBuilder()
          .setDescription(`${message.author} Hoş geldin! **${sebep}** sebebiyle <t:${parseInt(afkDate.date / 1000)}:R> afk'ydın`)
          .setFooter({ text: "AFK Sistemi" })
          .setTimestamp();

        db.delete(`afk_${message.author.id}`);
        db.delete(`afkDate_${message.author.id}`);

        await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
        return message.reply({ embeds: [dateEmbed] });
      }
    }
  },
};
