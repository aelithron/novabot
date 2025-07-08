import { APIEmbedField, EmbedBuilder, RestOrArray } from 'discord.js';
import { EchoEmbed } from '../novabot';
import getConfig from '../utils/config';

const config = getConfig();

export function echoEmbed(): EchoEmbed {
	const embed = new EmbedBuilder()
		.setColor(0x7932a8)
		.setTitle(`⋆✦⋆ ${config.owner.name}'s Boundaries ⋆✦⋆`)
		.setDescription(`Hey, ${config.owner.name} asked me to remind you of ${config.owner.pronouns.objective} boundaries!`)
	const fields: RestOrArray<APIEmbedField> = [];
  for (const [key, value] of Object.entries(config.boundaries)) {
    fields.push({ name: key, value: value });
  }
  embed.addFields(fields);
	return { embed, text: "" };
}
export function echoText(): string {
	let fields: string = '';
  for (const [key, value] of Object.entries(config.boundaries)) {
    fields = fields + `• ${key}: ${value}\n`
  }
	return `⋆✦⋆ ${config.owner.name}'s Boundaries ⋆✦⋆\n` +
		`Hey, ${config.owner.name} asked me to remind you of ${config.owner.pronouns.objective} boundaries!\n` + fields;
};