const { EmbedBuilder } = require("discord.js");
const db = require('croxydb');
const config = require("../config.json");

module.exports = {
  name: "afk",
  description: "AFK moduna geçmenizi sağlar.",
  options: [
    {
      name: "sebep",
      description: "AFK olma sebebiniz.",
      type: 3,
      required: true
    },
    {
      name: "bildirim",
      description: "AFK bildirimlerini almak istiyor musunuz?",
      type: 3,
      required: true,
      choices: [
        { name: "✅ Evet", value: "evet" },
        { name: "❌ Hayır", value: "hayir" }
      ]
    }
  ],

  run: async (client, interaction) => {
    const sebep = interaction.options.getString("sebep");
    const bildirimSecim = interaction.options.getString("bildirim");
    const bildirim = bildirimSecim === "evet";

    const displayName = interaction.member.nickname || interaction.user.username;
    const afkNickname = `[AFK] ${displayName}`;

    let nicknameChanged = true;


    try {
      if (interaction.member && interaction.member.manageable) {
        await interaction.member.setNickname(afkNickname);
      } else {
        nicknameChanged = false;
      }
    } catch (err) {
      nicknameChanged = false;
    }

    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setDescription(`
${config.emojis.success} **${interaction.user}**, başarıyla AFK moduna geçtin!

${config.emojis.info} **Sebep:** ${sebep}
${config.emojis.time} **Bildirimler:** ${bildirim ? "✅ Evet" : "❌ Hayır"}${
        !nicknameChanged
          ? "\n⚠️ *Yetkiniz veya rol sıralaması nedeniyle isminize [AFK] tagı eklenemedi.*"
          : ""
      }
      `)
      .setFooter({ text: "AFK Sistemi" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });

    
    db.set(`afk_${interaction.user.id}`, {
      sebep: sebep,
      bildirim: bildirim,
      time: Date.now()
    });
  },
};
