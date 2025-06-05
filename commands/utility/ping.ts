import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');
export async function execute(interaction: CommandInteraction) {
	const sent = await interaction.reply({ content: 'Pinging...' });
	interaction.editReply(`Pong! (${sent.createdTimestamp - interaction.createdTimestamp}ms)`);
};