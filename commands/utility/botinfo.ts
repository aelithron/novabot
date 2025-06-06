import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { ClientWithCommands } from '../../novabot';

export const data = new SlashCommandBuilder()
	.setName('botinfo')
	.setDescription('Gets info about me!');
export async function execute(interaction: CommandInteraction) {
	if (interaction.appPermissions.has('EmbedLinks')) {
		const serverEmbed = new EmbedBuilder()
			.setColor(0x7932a8)
			.setTitle(`${interaction.client.user.username}'s stats!`)
			.setThumbnail(interaction.client.user.avatarURL({ size: 1024, forceStatic: false }))
			.addFields(
				{ name: 'Servers', value: interaction.client.guilds.cache.size.toString(), inline: true },
				{ name: 'Commands', value: (interaction.client as ClientWithCommands).commands.size.toString() || '0', inline: true },
				{ name: 'Uptime', value: formatUptime(process.uptime()) },
				{ name: 'GitHub', value: '[github.com/aelithron/novabot](https://github.com/aelithron/novabot)', inline: true },
			)
			.setTimestamp()
			.setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
		await interaction.reply({ embeds: [serverEmbed] });
	} else {
		await interaction.editReply({
			content: `${interaction.client.user.username}'s stats!\n` +
				`Uptime: ${formatUptime(process.uptime())}\n` +
				`Servers: ${interaction.client.guilds.cache.size}\n` +
				`Commands: ${(interaction.client as ClientWithCommands).commands.size || '0'}`,
		});
	}
};

const formatUptime = (uptime: number) => {
	const days = Math.floor(uptime / 86400);
	const hours = Math.floor((uptime % 86400) / 3600);
	const minutes = Math.floor((uptime % 3600) / 60);
	const seconds = Math.floor(uptime % 60);
	return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};