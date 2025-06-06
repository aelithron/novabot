import { CommandInteraction, CommandInteractionOptionResolver, MessageFlags, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('grabemoji')
	.setDescription('Gets the provided emoji and gives a download link!')
  .addStringOption(option =>
    option.setName('emoji')
      .setDescription('The emoji to grab')
      .setRequired(true));
export async function execute(interaction: CommandInteraction) {
  const emojiId = (interaction.options as CommandInteractionOptionResolver)
    .getString('emoji')!
    .match(/\d+/)?.[0];
  if (!emojiId || !/^\d{17,19}$/.test(emojiId)) {
    await interaction.reply({ content: 'Invalid custom emoji! You may be trying to use a Unicode emoji, which you can just copy.', flags: MessageFlags.Ephemeral });
    return;
  }
  const emoji = interaction.client.emojis.resolve(emojiId);
  if (!emoji) {
    await interaction.reply({ content: `*[Download (in browser)](https://cdn.discordapp.com/emojis/${emojiId}.png?size=256)*\n-# If it shows up as blank, you entered an invalid emoji!` });
    return;
  }
	await interaction.reply({ content: `${emoji} - *[Download (in browser)](${emoji.imageURL({ size: 512 })})*` });
};