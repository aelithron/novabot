import { ApplicationIntegrationType, CommandInteraction, InteractionContextType, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Provides information about the server.')
	.setContexts([InteractionContextType.Guild])
	.setIntegrationTypes([ApplicationIntegrationType.GuildInstall]);
export async function execute(interaction: CommandInteraction) {
	if (!interaction.guild) return interaction.reply('This command can only be used in a server.');
	await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
};