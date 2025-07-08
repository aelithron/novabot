import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { EchoEmbed } from "../novabot";
import getConfig from '../utils/config'

const config = getConfig();

export function echoEmbed(): EchoEmbed {
  const embed = new EmbedBuilder()
    .setColor(0x7932a8)
    .setTitle('🎂')
    .setDescription(`It\'s ${config.owner.name}\'s birthday today!`)
  const sendCake = new ButtonBuilder()
		.setCustomId('send-cake')
		.setLabel('Send Cake 🎂')
		.setStyle(ButtonStyle.Success);
  const row = new ActionRowBuilder()
	.addComponents(sendCake) as ActionRowBuilder<ButtonBuilder>; 
  return { embed, text: `Happy birthday to <@${config.owner.id}>!`, components: [row] };
}

export function echoText(): string {
  return `Happy birthday to ${config.owner.name} (<@${config.owner.id}>)! 🎂`;
}