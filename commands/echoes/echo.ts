import { AutocompleteInteraction, CommandInteraction, CommandInteractionOptionResolver, MessageFlags, SlashCommandBuilder } from 'discord.js';
import { EchoEmbed } from '../../novabot';
import { getEchoModule, loadEchoList } from '../../utils/load-echoes';

export const data = new SlashCommandBuilder()
  .setName('echo')
  .setDescription("Sends an Echo (aka canned message).")
  .addStringOption(option =>
    option.setName('id')
      .setDescription('The echo ID to send')
      .setRequired(true)
      .setAutocomplete(true))
  .addUserOption(option =>
    option.setName('ping')
      .setDescription('A user to ping in the echo'));
export async function autocomplete(interaction: AutocompleteInteraction) {
  const focusedValue = interaction.options.getFocused();
  const choices = loadEchoList();
  const filtered = choices.filter(choice => choice.startsWith(focusedValue));
  await interaction.respond(
    filtered.map(choice => ({ name: choice, value: choice })),
  );
}
export async function execute(interaction: CommandInteraction) {
  const pingUser = (interaction.options as CommandInteractionOptionResolver).getUser('ping');
  const echoId = (interaction.options as CommandInteractionOptionResolver).getString('id');
  if (!echoId) {
    await interaction.reply({ content: 'You must provide an echo ID!', flags: MessageFlags.Ephemeral });
    return;
  }
  const echoModule: { echoText: Function, echoEmbed: Function } = await getEchoModule(echoId);
  if (!echoModule) {
    await interaction.reply({ content: `Echo "${echoId}" not found!`, flags: MessageFlags.Ephemeral });
    return;
  }
  if (interaction.appPermissions.has('EmbedLinks') && echoModule.echoEmbed) {
    const echoEmbed: EchoEmbed = echoModule.echoEmbed(interaction);
    echoEmbed.embed
      .setTimestamp()
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
    await interaction.reply({ 
      content: `${pingUser !== null ? `<@${pingUser.id}>` : ''}\n${echoEmbed.text}`, 
      embeds: [echoEmbed.embed], 
      ...(echoEmbed.components ? { components: echoEmbed.components } : {})
    });
  } else {
    const echoMessage: string = echoModule.echoText(interaction);
    await interaction.reply({ content: `${pingUser !== null ? `<@${pingUser.id}>` : ''}\n${echoMessage}` });
  }
};