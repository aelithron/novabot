import { APIEmbedField, CommandInteraction, EmbedBuilder, RestOrArray } from 'discord.js';
import { EchoEmbed } from '../novabot';
import getConfig from '../utils/config';

const config = getConfig();

export function echoEmbed(interaction: CommandInteraction): EchoEmbed {
  const embed = new EmbedBuilder()
    .setColor(0x7932a8)
    .setTitle(`⋆✦⋆  **${config.owner.name}**  ⋆✦⋆`)
    .setThumbnail(interaction.user.displayAvatarURL({ size: 1024, forceStatic: false }));
  const fields: RestOrArray<APIEmbedField> = [];
  for (const [key, value] of Object.entries(config.introduction)) {
    fields.push({ name: key, value: value });
  }
  embed.addFields(fields);
  return { embed, text: `Hi everyone, I'm ${interaction.client.user.displayName}! ${config.owner.name} (<@${config.owner.id}>) asked me to introduce ${config.owner.pronouns.objective} to you, so here we go!` };
}
export function echoText(interaction: CommandInteraction): string {
  let fields: string = '';
  for (const [key, value] of Object.entries(config.introduction)) {
    fields = fields + `✧˖° ${key} ~ ${value}\n`
  }
  return `Hi everyone, I'm ${interaction.client.user.displayName}! ${config.owner.name} (<@${config.owner.id}>) asked me to introduce ${config.owner.pronouns.objective} to you, so here we go!\n` +
    `⋇⋆✦⋆⋇   **${config.owner.name}**   ⋇⋆✦⋆⋇\n` + fields;
};

// this isn't used anymore to make the bot less complex, build a version of the bot with this included if you want!
// this is also incompatible with the echoes system as it currently is.
/*
  const introLog = interaction.client.guilds.cache.get("1380003469242404975")?.channels.cache.get("1380010466474065983") as TextChannel;
  introLog.send({ content: `Hey, I just introduced you at ${(await introMessage.fetch()).url}!` });
*/