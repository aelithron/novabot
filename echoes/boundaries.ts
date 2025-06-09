import { EmbedBuilder } from 'discord.js';
import { EchoEmbed } from '../novabot';

export function echoEmbed(): EchoEmbed {
	const embed = new EmbedBuilder()
		.setColor(0x7932a8)
		.setTitle("⋆✦⋆ nova's boundaries ⋆✦⋆")
		.setDescription(`Hey, my creator <@1279516012642963528> asked me to remind you of their boundaries!`)
		.setFields(
			{ name: '• Ask to DM', value: 'Please ask them before you send them a DM!' },
			{ name: '• Ask to vent', value: 'Please ask them before venting to them!' },
			{ name: '• No NSFW (suggestive okay)', value: "Please don't send NSFW content to them, but you can be suggestive if you want." },
		)
	return { embed, text: "" };
}
export function echoText(): string {
	return '⋆✦⋆ nova\'s boundaries ⋆✦⋆\n' +
		'Hey, my creator <@1279516012642963528> asked me to remind you of their boundaries!\n' +
		'• Ask to DM: Please ask them before you send them a DM!\n' +
		'• Ask to vent: Please ask them before venting to them!\n' +
		'• No NSFW (suggestive okay): Please don\'t send NSFW content to them, but you can be suggestive if you want.'
};