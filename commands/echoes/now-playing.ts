import { CommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder, CommandInteractionOptionResolver, MessageFlags } from "discord.js";
import getInfo from "../../utils/jellyfin";
import { LyricLine } from "@jellyfin/sdk/lib/generated-client/models";
import { MovieState, MusicState, PlayingState } from "../../novabot";
import getConfig from "../../utils/config";

const config = getConfig();

export const data = new SlashCommandBuilder()
  .setName('now-playing')
  .setDescription('Sends the current song info.')
  .addBooleanOption(option =>
    option.setName('link')
      .setDescription('Whether to include links to the content. Defaults to true.'))
  .addBooleanOption(option =>
    option.setName('lyrics')
      .setDescription('Whether to include lyrics (if the playing content is music). Defaults to false.'));
export async function execute(interaction: CommandInteraction) {
  if (!config.features.media) {
    interaction.reply('The `media` feature is disabled in my configuration!');
    return;
  }
  await interaction.deferReply();
  const info = await getInfo();
  if (!info.state || info.state === "failed-connect") {
    await interaction.editReply({ content: `${config.owner.name} isn't playing anything right now.` });
    if (info.state === "failed-connect") {
      console.error("[bot] Failed to connect to Jellyfin server.");
      await interaction.followUp({ content: 'I couldn\'t find your Jellyfin server!', flags: MessageFlags.Ephemeral });
    }
    return;
  }
  let state: PlayingState["state"] = info.state;
  switch (info.type) {
    case 'Audio':
      state = info.state as MusicState;
      const lyricsOption = (interaction.options as CommandInteractionOptionResolver).getBoolean('lyrics') === true;
      if (interaction.appPermissions.has('EmbedLinks')) {
        const userEmbed = new EmbedBuilder()
          .setColor(0x7932a8)
          .setTitle(`⋆✦⋆  ${config.owner.name}'s Current Song  ⋆✦⋆`)
          .setImage(info.cover!)
          .setDescription(`🎧 **${info.title}** - *${state.artist}*\n` +
            (!state.isSingle ? `💿 on *${state.album}*\n` : '') +
            ((lyricsOption && state.lyrics) ? `${getLyric(state.lyrics)}\n` : '') +
            'lıllılı.ıllı.ılılıı\n' +
            `${info.isPaused ? '⏸' : '▶️'} ${generateProgressBar(info.position ?? 0, info.duration ?? 0)}`)
          .setTimestamp()
          .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
        if ((interaction.options as CommandInteractionOptionResolver).getBoolean('link') === false) {
          await interaction.editReply({ embeds: [userEmbed] });
          return;
        }
        const youtubeButton = new ButtonBuilder()
          .setLabel('Open - YouTube')
          .setURL(`https://youtube.com/results?search_query=${state.artist?.replace(/ /g, '+')}+${info.title?.replace(/ /g, '+')}`)
          .setStyle(ButtonStyle.Link);
        const spotifyButton = new ButtonBuilder()
          .setLabel('Open - Spotify')
          .setURL(`https://open.spotify.com/search/${state.artist?.replace(/ /g, '%20')}%20${info.title?.replace(/ /g, '%20')}`)
          .setStyle(ButtonStyle.Link);
        const row = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(youtubeButton, spotifyButton);
        await interaction.editReply({ embeds: [userEmbed], components: [row] });
        return;
      } else {
        const linkOption = (interaction.options as CommandInteractionOptionResolver).getBoolean('link');
        const links = `[Open - YouTube](https://youtube.com/results?search_query=${state.artist?.replace(/ /g, '+')}+${info.title?.replace(/ /g, '+')}) | ` +
          `[Open - Spotify](https://open.spotify.com/search/${state.artist?.replace(/ /g, '%20')}%20${info.title?.replace(/ /g, '%20')})`
        await interaction.editReply({
          content: `⋆✦⋆  ${config.owner.name}'s Current Song  ⋆✦⋆\n` +
            `🎧 **${info.title}** - *${state.artist}*\n` +
            (!state.isSingle ? `💿 on *${state.album}*\n` : '') +
            ((lyricsOption && state.lyrics) ? `${getLyric(state.lyrics)}\n` : '') +
            'lıllılı.ıllı.ılılıı\n' +
            `${info.isPaused ? '⏸' : '▶️'} ${generateProgressBar(info.position ?? 0, info.duration ?? 0)}\n` +
            `${linkOption !== false ? links : ''}`
        });
        return;
      }
    case 'Movie':
      state = info.state as MovieState;
      if (interaction.appPermissions.has('EmbedLinks')) {
        const userEmbed = new EmbedBuilder()
          .setColor(0x7932a8)
          .setTitle(`⋆✦⋆  ${config.owner.name}'s Current Movie  ⋆✦⋆`)
          .setThumbnail(info.cover!)
          .setDescription(`🎬 **${info.title}** (*${state.year}*)\n` +
            '║▌│█│║▌║││█║▌\n' +
            `${info.isPaused ? '⏸' : '▶️'} ${generateProgressBar(info.position ?? 0, info.duration ?? 0)}`)
          .setTimestamp()
          .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
        if ((interaction.options as CommandInteractionOptionResolver).getBoolean('link') === false || !state.imdbId) {
          await interaction.editReply({ embeds: [userEmbed] });
          return;
        }
        const imdbButton = new ButtonBuilder()
          .setLabel('Open - IMDb')
          .setURL(`https://imdb.com/title/${state.imdbId}`)
          .setStyle(ButtonStyle.Link);
        const row = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(imdbButton);
        await interaction.editReply({ embeds: [userEmbed], components: [row] });
        break;
      } else {
        const linkOption = (interaction.options as CommandInteractionOptionResolver).getBoolean('link') !== false && state.imdbId;
        const links = `[Open - IMDb](https://imdb.com/title/${state.imdbId})`;
        await interaction.editReply({
          content: `⋆✦⋆  ${config.owner.name}'s Current Movie  ⋆✦⋆\n` +
            `🎬 **${info.title}** (*${state.year}*)\n` +
            '║▌│█│║▌║││█║▌\n' +
            `${info.isPaused ? '⏸' : '▶️'} ${generateProgressBar(info.position ?? 0, info.duration ?? 0)}\n` +
            `${linkOption ? links : ''}`
        });
        break;
      }
    default:
      await interaction.editReply({ content: `${config.owner.name} is playing something, but I haven't been taught to understand it 😢` });
      console.warn(`[bot] Unknown playing type: ${info.type}`);
      return;
  };
};

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
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
  let line: LyricLine;
  for (;;) {
    line = lines[Math.floor(Math.random() * lines.length)];
    if (line.Text != undefined && line.Text != '') break;
  }
  return `♪ *${line.Text}*`;
}