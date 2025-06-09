import { CommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder, CommandInteractionOptionResolver } from "discord.js";
import getInfo from "../../utils/jellyfin";
import { LyricLine } from "@jellyfin/sdk/lib/generated-client/models";

export const data = new SlashCommandBuilder()
  .setName('now-playing')
  .setDescription('Sends the current song info.')
  .addBooleanOption(option =>
    option.setName('link')
      .setDescription('Whether to include links to YouTube and Spotify. Defaults to true.'))
  .addBooleanOption(option =>
    option.setName('lyrics')
      .setDescription('Whether to include lyrics. Defaults to false.'));
export async function execute(interaction: CommandInteraction) {
  await interaction.deferReply();
  const info = await getInfo();
  if (!info.playing) {
    await interaction.editReply({ content: 'nova isn\'t listening to any music.' });
    return;
  }
  const lyricsOption = (interaction.options as CommandInteractionOptionResolver).getBoolean('lyrics') === true;
  if (interaction.appPermissions.has('EmbedLinks')) {
    const userEmbed = new EmbedBuilder()
      .setColor(0x7932a8)
      .setTitle(`⋆✦⋆  nova's current song  ⋆✦⋆`)
      .setThumbnail(info.cover!)
      .setDescription(`🎧 **${info.title}** - *${info.artist}*\n` +
        (!info.isSingle ? `💿 on *${info.album}*\n` : '') +
        ((lyricsOption && info.lyrics) ? `${getLyric(info.lyrics)}\n` : '') +
        'lıllılı.ıllı.ılılıı\n' +
        `${info.isPaused ? '⏸' : '▶︎'} ${generateProgressBar(info.position ?? 0, info.duration ?? 0)}`)
      .setTimestamp()
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
    if ((interaction.options as CommandInteractionOptionResolver).getBoolean('link') === false) {
      await interaction.editReply({ embeds: [userEmbed] });
      return;
    }
    const youtubeButton = new ButtonBuilder()
      .setLabel('Open - YouTube')
      .setURL(`https://youtube.com/results?search_query=${info.artist?.replace(/ /g, '+')}+${info.title?.replace(/ /g, '+')}`)
      .setStyle(ButtonStyle.Link);
    const spotifyButton = new ButtonBuilder()
      .setLabel('Open - Spotify')
      .setURL(`https://open.spotify.com/search/${info.artist?.replace(/ /g, '%20')}%20${info.title?.replace(/ /g, '%20')}`)
      .setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(youtubeButton, spotifyButton);
    await interaction.editReply({ embeds: [userEmbed], components: [row] });
  } else {
    const linkOption = (interaction.options as CommandInteractionOptionResolver).getBoolean('link');
    const links = `[Open - YouTube](https://youtube.com/results?search_query=${info.artist?.replace(/ /g, '+')}+${info.title?.replace(/ /g, '+')}) | ` +
      `[Open - Spotify](https://open.spotify.com/search/${info.artist?.replace(/ /g, '%20')}%20${info.title?.replace(/ /g, '%20')})`
    await interaction.editReply({
      content: '⋆✦⋆  nova\'s current song  ⋆✦⋆\n' +
        `🎧 **${info.title}** - *${info.artist}*\n` +
        (!info.isSingle ? `💿 on *${info.album}*\n` : '') +
        ((lyricsOption && info.lyrics) ? `${getLyric(info.lyrics)}\n` : '') +
        'lıllılı.ıllı.ılılıı\n' +
        `${info.isPaused ? '⏸' : '▶︎'} ${generateProgressBar(info.position ?? 0, info.duration ?? 0)}\n` +
        `${linkOption !== false ? links : ''}`
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

function getLyric(lines: LyricLine[]): string | null {
  if (lines.length === 0) return null;
  const line = lines[Math.floor(Math.random() * lines.length)];
  return `♪ *${line.Text}*`;
}