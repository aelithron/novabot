import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { EchoEmbed } from '../novabot';
import getConfig from '../utils/config';

const config = getConfig();

export function echoEmbed(interaction: CommandInteraction): EchoEmbed {
  const embed = new EmbedBuilder()
    .setColor(0x7932a8)
    .setTitle('⋆✦⋆  𝐧𝐨𝐯𝐚 / 𝐚𝐞𝐥𝐢𝐭𝐡𝐫𝐨𝐧  ⋆✦⋆')
    .setFields(
      { name: '𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲', value: `June 16 ( y/o)` },
      { name: '𝐆𝐞𝐧𝐝𝐞𝐫', value: 'non-binary - they/them' },
      { name: '𝐒𝐞𝐱𝐮𝐚𝐥𝐢𝐭𝐲', value: 'omnisexual (pref. for women and enbies)' },
      { name: '𝐇𝐨𝐛𝐛𝐢𝐞𝐬', value: 'writing, coding' },
      { name: '𝐓𝐫𝐢𝐠𝐠𝐞𝐫𝐬', value: 'loud noises, touch' },
      { name: '𝐁𝐨𝐮𝐧𝐝𝐚𝐫𝐢𝐞𝐬', value: '• Ask to DM\n• Ask to vent\n• No NSFW (suggestive okay)' },
      { name: '𝐅𝐚𝐧𝐝𝐨𝐦𝐬', value: 'Murder Drones, Genshin Impact, Life Series' },
      { name: '𝐌𝐮𝐬𝐢𝐜', value: 'Derivakat, AJR, Cavetown' },
      { name: '𝐄𝐱𝐭𝐫𝐚 𝐍𝐨𝐭𝐞𝐬', value: 'I have ADHD and social anxiety, so I may not be very talkative!' },
    )
  return { embed, text: `Hi everyone, I'm ${interaction.client.user.displayName}! ${config.owner.name} (<@${config.owner.id}>) asked me to introduce them to you, so here we go!` };
}
export function echoText(interaction: CommandInteraction): string {
  return `Hi everyone, I'm ${interaction.client.user.displayName}! ${config.owner.name} (<@${config.owner.id}>) asked me to introduce them to you, so here we go!` +
    "⋇⋆✦⋆⋇   𝐧𝐨𝐯𝐚 / 𝐚𝐞𝐥𝐢𝐭𝐡𝐫𝐨𝐧   ⋇⋆✦⋆⋇\n" +
    "✧˖° 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲 ~ June 16 (14 y/o)\n" +
    "✧˖° 𝐆𝐞𝐧𝐝𝐞𝐫 ~ non-binary (they/them)\n" +
    "✧˖° 𝐒𝐞𝐱𝐮𝐚𝐥𝐢𝐭𝐲 ~ omnisexual\n" +
    "✧˖° 𝐇𝐨𝐛𝐛𝐢𝐞𝐬 ~ writing, coding\n" +
    "✧˖° 𝐓𝐫𝐢𝐠𝐠𝐞𝐫𝐬 ~ loud noises, touch\n" +
    "✧˖° 𝐁𝐨𝐮𝐧𝐝𝐚𝐫𝐢𝐞𝐬 ~ ask to DM | ask to vent | no NSFW (suggestive okay)\n" +
    "✧˖° 𝐅𝐚𝐧𝐝𝐨𝐦𝐬 ~ Murder Drones, Genshin Impact, Life Series\n" +
    "✧˖° 𝐌𝐮𝐬𝐢𝐜 ~ Derivakat, AJR, Cavetown\n" +
    "✧˖° 𝐄𝐱𝐭𝐫𝐚  𝐍𝐨𝐭𝐞𝐬 ~ I have ADHD and social anxiety, so I may not be very talkative!"
};