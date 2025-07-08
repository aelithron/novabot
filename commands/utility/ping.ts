import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Checks my ping/responsiveness!');
export async function execute(interaction: CommandInteraction) {
	const sent = await interaction.reply({ content: 'Pinging...', withResponse: true });
	if (!sent.resource?.message) {
		await interaction.editReply(`Pong!\n-# websocket ping: ${interaction.client.ws.ping}ms\n-# roundtrip latency: unknown`);
		return;
	}
	await interaction.editReply(`Pong!\n-# websocket ping: ${interaction.client.ws.ping}ms\n-# roundtrip latency: ${sent.resource.message.createdTimestamp - interaction.createdTimestamp}`);
};