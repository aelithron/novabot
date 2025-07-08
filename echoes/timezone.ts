import { EmbedBuilder } from 'discord.js';
import { EchoEmbed } from '../novabot';
import getConfig from "../utils/config";

const config = getConfig();
export function echoEmbed(): EchoEmbed {
  const embed = new EmbedBuilder()
    .setColor(0x7932a8)
    .setTitle(`⋆✦⋆ ${config.owner.name}'s Timezone! ⋆✦⋆`)
    .setDescription(`${config.owner.name} is in ${config.timezone.name} (GMT${config.timezone.gmtOffset})!`)
  return { embed, text: "" };
}
export function echoText(): string {
  return `⋆✦⋆ ${config.owner.name}'s Timezone ⋆✦⋆\n` +
    `${config.owner.name} is in ${config.timezone.name} (GMT${config.timezone.gmtOffset})!`
};