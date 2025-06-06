import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('introduce-nova')
	.setDescription('Introduces Nova, my creator, to the current channel.');
export async function execute(interaction: CommandInteraction) {
	const age = Math.floor((Date.now() - 1276693200000) / (1000 * 60 * 60 * 24 * 365.25));
	const userEmbed = new EmbedBuilder()
		.setColor(0x7932a8)
		.setTitle('⋆✦⋆  𝐧𝐨𝐯𝐚 / 𝐚𝐞𝐥𝐢𝐭𝐡𝐫𝐨𝐧  ⋆✦⋆')
		.setFields(
			{ name: '𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲', value: `June 16 (${age} y/o)` },
			{ name: '𝐆𝐞𝐧𝐝𝐞𝐫', value: 'non-binary - they/them' },
			{ name: '𝐒𝐞𝐱𝐮𝐚𝐥𝐢𝐭𝐲', value: 'omnisexual (pref. for women and enbies)' },
			{ name: '𝐇𝐨𝐛𝐛𝐢𝐞𝐬', value: 'writing, coding' },
			{ name: '𝐓𝐫𝐢𝐠𝐠𝐞𝐫𝐬', value: 'loud noises, touch' },
			{ name: '𝐁𝐨𝐮𝐧𝐝𝐚𝐫𝐢𝐞𝐬', value: '• Ask to DM\n• Ask to vent\n• No NSFW (suggestive okay)' },
			{ name: '𝐅𝐚𝐧𝐝𝐨𝐦𝐬', value: 'Murder Drones, Genshin Impact, Life Series' },
			{ name: '𝐌𝐮𝐬𝐢𝐜', value: 'Derivakat, AJR, Cavetown' },
			{ name: '𝐄𝐱𝐭𝐫𝐚 𝐍𝐨𝐭𝐞𝐬', value: 'I have ADHD and social anxiety, so I may not be very talkative!' },
		)
		.setThumbnail(interaction.user.displayAvatarURL({ size: 1024, forceStatic: false }))
		.setTimestamp()
		.setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
	await interaction.reply({ content: "Hi everyone, I'm NovaBot! My creator, <@1279516012642963528>, asked me to introduce them to you, so here we go!", embeds: [userEmbed] });
};