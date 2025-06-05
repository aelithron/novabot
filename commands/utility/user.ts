import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder, User, EmbedBuilder, GuildMember } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Get info about a user')
  .addUserOption(option =>
    option.setName('user')
      .setDescription('The user to look up'))
  .addBooleanOption(option =>
    option.setName('dev')
      .setDescription('Get extra developer-related information'));
export async function execute(interaction: CommandInteraction) {
  await interaction.deferReply();
  const user: User = (interaction.options as CommandInteractionOptionResolver).getUser('user') || interaction.user;
  let guildMember: undefined | GuildMember = undefined;
  if (interaction.guild?.members.cache.has(user.id)) guildMember = interaction.guild.members.cache.get(user.id);
  
  const userEmbed = new EmbedBuilder()
    .setColor(0x7932a8)
    .setTitle(`Information about ${user.displayName} ${user.bot ? '(Bot)' : ''}`)
    .setThumbnail(user.displayAvatarURL({ size: 1024, extension: 'png', forceStatic: false }))
    .addFields(
      { name: '**Global**', value: ''},
      { name: 'Username', value: user.username, inline: true },
      { name: 'Account Created', value: user.createdAt.toDateString(), inline: true },
    )
    .setTimestamp()
    .setFooter({ text: interaction.client.user.username, iconURL:interaction.client.user.displayAvatarURL() });
  if (guildMember) {
    userEmbed.addFields(
      { name: '**Server**', value: ''},
      { name: 'Nickname', value: guildMember.nickname || guildMember.displayName, inline: true },
      { name: 'Joined Server', value: guildMember.joinedAt?.toDateString() || "Unknown", inline: true },
    );
  }
  if ((interaction.options as CommandInteractionOptionResolver).getBoolean('dev')) {
    userEmbed.addFields(
      { name: '**Developer Info**', value: '' },
      { name: 'ID', value: user.id, inline: true },
      { name: 'Flags', value: user.flags ? user.flags.toArray().join(', ') : 'None' }
    );
  }
  await interaction.editReply({ embeds: [userEmbed] });
};