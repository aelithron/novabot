import { EmbedBuilder } from 'discord.js';
import { EchoEmbed } from '../novabot';

export function echoEmbed(): EchoEmbed {
  const embed = new EmbedBuilder()
    .setColor(0x7932a8)
    .setTitle("⋆✦⋆ nova's timezone! ⋆✦⋆")
    .setDescription(`Hey! Here\'s some info on <@1279516012642963528>\'s timezone!`)
    .setFields(
      { name: 'Timezone', value: 'Mountain Daylight Time (UTC-6)' },
      { name: 'Their 12:00 PM', value: '<t:1749492000:t> in your timezone' }
    )
  return { embed, text: "" };
}
export function echoText(): string {
  return '⋆✦⋆ nova\'s timezone! ⋆✦⋆\n' +
    'Hey! Here\'s some info on <@1279516012642963528>\'s timezone!\n' +
    'They are in Mountain Daylight Time, which is UTC-6.\n' +
    'Their 12:00 PM is <t:1749492000:t> in your timezone.';
};