import { EmbedBuilder } from 'discord.js';
import { EchoEmbed } from '../novabot';
import getConfig from "../utils/config";

const config = getConfig();
export function echoEmbed(): EchoEmbed {
  const embed = new EmbedBuilder()
    .setColor(0x7932a8)
    .setTitle(`⋆✦⋆ ${config.owner.name}'s Timezone! ⋆✦⋆`)
    .setDescription(`Hey! Here\'s some info on <@1279516012642963528>\'s timezone!`)
    .setFields(
      { name: 'Timezone', value: 'Mountain Daylight Time (UTC-6)' },
      { name: 'Their 12:00 PM', value: '<t:1749492000:t> in your timezone' }
    )
  return { embed, text: "" };
}
export function echoText(): string {
  return `⋆✦⋆ ${config.owner.name}'s Timezone! ⋆✦⋆\n` +
    `Hey! Here's some info on <@${config.owner.id}>'s timezone!\n` +
    'They are in Mountain Daylight Time, which is UTC-6.\n' +
    'Their 12:00 PM is <t:1749492000:t> in your timezone.';
};