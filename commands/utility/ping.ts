import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Checks my ping/responsiveness!');
export async function execute(interaction: CommandInteraction) {
	const sent = await interaction.reply({ content: 'Pinging...' });
	interaction.editReply(`Pong! (${sent.createdTimestamp - interaction.createdTimestamp}ms)`);
};