import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import getInfo from "../../utils/jellyfin";

export const data = new SlashCommandBuilder()
  .setName('now-playing')
  .setDescription('Sends the current song info.');
export async function execute(interaction: CommandInteraction) {
  await interaction.deferReply();
  const info = await getInfo();
  if (!info.playing) {
    await interaction.editReply({ content: 'nova isn\'t listening to any music.' });
    return;
  }
  if (!interaction.appPermissions.has('EmbedLinks')) {
    const userEmbed = new EmbedBuilder()
      .setColor(0x7932a8)
      .setTitle(`⋆✦⋆  nova's current song  ⋆✦⋆`)
      //.setThumbnail()
      .setDescription(`🎧 **${info.title}** - *${info.artist}*\n` +
        `💿 on *${info.album}*\n` +
        'lıllılı.ıllı.ılılıı\n' +
        `${generateProgressBar(info.position ?? 0, info.duration ?? 0)}`
      )
      .setTimestamp()
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
    await interaction.editReply({ embeds: [userEmbed] });
  } else {
    await interaction.editReply({ content: '⋆✦⋆  nova\'s current song  ⋆✦⋆\n' +
      `🎧 **${info.title}** - *${info.artist}*\n` +
      `💿 on *${info.album}*\n` +
      'lıllılı.ıllı.ılılıı\n' +
      `${generateProgressBar(info.position ?? 0, info.duration ?? 0)}`,
    });
  };
};

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  return `${Math.floor(totalSeconds / 60)}:${(totalSeconds % 60).toString().padStart(2, "0")}`;
}
function generateProgressBar(positionMs: number, durationMs: number): string {
  const barLength = 20; // this is customizable! :D
  if (!durationMs || durationMs === 0) return "[—] live or unknown length";
  const filledBars = Math.round(barLength * (positionMs / durationMs));
  const bar = `[${"■".repeat(filledBars)}${"░".repeat(barLength - filledBars)}]`;
  const timeInfo = `${formatTime(positionMs)} / ${formatTime(durationMs)}`;
  return `${bar} ${timeInfo}`;
}