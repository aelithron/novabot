import { ApplicationIntegrationType, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, InteractionContextType, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Looks up info about the server.')
	.setContexts([InteractionContextType.Guild])
	.setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
	.addBooleanOption(option =>
		option.setName('dev')
			.setDescription('Get extra developer-related information')
	);
export async function execute(interaction: CommandInteraction) {
	if (!interaction.guild) return interaction.reply('This command can only be used in a server.');
	if (interaction.appPermissions.has('EmbedLinks')) {
		const serverEmbed = new EmbedBuilder()
			.setColor(0x7932a8)
			.setTitle(`Information about ${interaction.guild.name}`)
			.setThumbnail(interaction.guild.iconURL({ size: 1024, forceStatic: false }))
			.addFields(
				{ name: 'Owner', value: `<@${interaction.guild.ownerId}>`, inline: true },
				{ name: 'Member Count', value: interaction.guild.memberCount.toString(), inline: true },
				{ name: 'Server Created', value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>`, inline: true },
				{ name: 'Icon', value: `[*Open (in browser)*](${interaction.guild.iconURL({ size: 2048, forceStatic: false, extension: "png" })})`, inline: true },
			)
			.setTimestamp()
			.setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
		if ((interaction.options as CommandInteractionOptionResolver).getBoolean('dev')) {
			serverEmbed.addFields(
				{ name: '**Developer Info**', value: '' },
				{ name: 'ID', value: interaction.guild.id, inline: true },
				{ name: 'Region', value: interaction.guild.preferredLocale, inline: true },
				{ name: 'Flags', value: interaction.guild.features.length > 0 ? interaction.guild.features.join(', ') : 'None' },
			);
		}
		await interaction.reply({ embeds: [serverEmbed] });
	} else {
		await interaction.editReply({
			content: `Information about ${interaction.guild.name}\n` +
				`Owner: <@${interaction.guild.ownerId}>\n` +
				`Member Count: ${interaction.guild.memberCount}\n` +
				`Server Created: <t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>\n` +
				`Icon: [*Open (in browser)*](${interaction.guild.iconURL({ size: 2048, forceStatic: false, extension: "png" })})\n` +
				((interaction.options as CommandInteractionOptionResolver).getBoolean('dev') ? `ID: ${interaction.guild.id}\nRegion: ${interaction.guild.preferredLocale}\nFlags: ${interaction.guild.features.length > 0 ? interaction.guild.features.join(', ') : 'None'}` : '')
		});
	}
};