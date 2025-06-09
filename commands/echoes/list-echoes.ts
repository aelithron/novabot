import { CommandInteraction, EmbedBuilder, MessageFlags, SlashCommandBuilder } from 'discord.js';
import { loadEchoList } from '../../utils/load-echoes';

export const data = new SlashCommandBuilder()
  .setName('list-echoes')
  .setDescription("Lists all of the Echoes (aka canned messages).");
export async function execute(interaction: CommandInteraction) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  const echoes = loadEchoList();
  if (interaction.appPermissions.has('EmbedLinks')) {
    const echoListEmbed = new EmbedBuilder()
      .setColor(0x7932a8)
      .setTitle('⋆✦⋆ List of Echoes ⋆✦⋆')
      .setDescription(echoes.map(echoId => `• \`${echoId}\``).join('\n'))
      .setTimestamp()
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
    await interaction.editReply({ embeds: [echoListEmbed] });
  } else {
    await interaction.editReply({ content: 'Here you go, all the Echoes I could find! :D\n' + echoes.map(echoId => `• \`${echoId}\``).join('\n') });
  }
};