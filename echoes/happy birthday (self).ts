import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { EchoEmbed } from "../novabot";

export function echoEmbed(): EchoEmbed {
  const embed = new EmbedBuilder()
    .setColor(0x7932a8)
    .setTitle('🎂')
    .setDescription('It\'s my creator\'s birthday today!')
  const sendCake = new ButtonBuilder()
		.setCustomId('send-cake')
		.setLabel('Send Cake 🎂')
		.setStyle(ButtonStyle.Success);
  const row = new ActionRowBuilder()
	.addComponents(sendCake) as ActionRowBuilder<ButtonBuilder>; 
  return { embed, text: 'Happy birthday to <@1279516012642963528>!', components: new Array(row) };
}

export function echoText(): string {
  return 'Happy birthday to <@1279516012642963528>, my creator! 🎂'
}