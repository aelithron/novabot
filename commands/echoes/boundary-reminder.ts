import { CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('boundary-reminder')
	.setDescription("Reminds people of Nova's boundaries.")
	.addUserOption(option =>
		option.setName('user')
			.setDescription('The user to remind of boundaries'));
export async function execute(interaction: CommandInteraction) {
	if (interaction.appPermissions.has('EmbedLinks')) {
		const boundaryEmbed = new EmbedBuilder()
			.setColor(0x7932a8)
			.setTitle("⋆✦⋆ nova's boundaries ⋆✦⋆")
			.setDescription(`Hey, my creator <@1279516012642963528> asked me to remind you of their boundaries!`)
			.setFields(
				{ name: '• Ask to DM', value: 'Please ask them before you send them a DM!' },
				{ name: '• Ask to vent', value: 'Please ask them before venting to them!' },
				{ name: '• No NSFW (suggestive okay)', value: "Please don't send NSFW content to them, but you can be suggestive if you want." },
			)
			.setTimestamp()
			.setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
		const user = (interaction.options as CommandInteractionOptionResolver).getUser('user');
		await interaction.reply({ content: `${user !== null ? `<@${user.id}>` : ''}`, embeds: [boundaryEmbed] });
	} else {
		const user = (interaction.options as CommandInteractionOptionResolver).getUser('user');
		await interaction.reply({
			content: `${user !== null ? `<@${user.id}>` : ''}\n` +
				"⋆✦⋆ nova's boundaries ⋆✦⋆\n" +
				"Hey, my creator <@1279516012642963528> asked me to remind you of their boundaries!\n" +
				'• Ask to DM: Please ask them before you send them a DM!\n' +
				'• Ask to vent: Please ask them before venting to them!\n' +
				'• No NSFW (suggestive okay): Please don\'t send NSFW content to them, but you can be suggestive if you want.'
		});
	}
};