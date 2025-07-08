import { Client, Collection, Events, GatewayIntentBits, ActivityType, MessageFlags } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';
import { ClientWithCommands, Command } from './novabot';
import getConfig from './utils/config.ts';
dotenv.config();

if (!process.env.BOT_TOKEN) {
  console.error("[bot] Missing BOT_TOKEN in environment variables.");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as ClientWithCommands;
client.commands = await loadCommands();
const config = getConfig();

client.once(Events.ClientReady, readyClient => {
  console.log(`[bot] Ready - Logged in (${readyClient.user.tag}) :D`);
  if (process.argv.includes('--reload-cmds')) import('./deploycmds.ts');
  client.user?.setActivity(`${config.owner.name}'s thoughts`, { type: ActivityType.Listening });
});
client.login(process.env.BOT_TOKEN);

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = (interaction.client as ClientWithCommands).commands.get(interaction.commandName);
    if (!command) {
      console.error(`[bot] No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      }
    }
  } else if (interaction.isAutocomplete()) {
    const command = (interaction.client as ClientWithCommands).commands.get(interaction.commandName);
    if (!command) {
      console.error(`[bot] No command matching ${interaction.commandName} was found.`);
      return;
    }
    if (!command.autocomplete) {
      console.error(`[bot] Command ${interaction.commandName} does not have an autocomplete function.`);
      return;
    }
    try {
      await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
  } else if (interaction.isButton()) {
		if (interaction.customId === "send-cake") {
      await interaction.reply({ content: `<@${interaction.user.id}> sent a birthday cake to you, <@${config.owner.id}>! 🎂` });
    } else return;
	}
});

export async function loadCommands(): Promise<Collection<string, Command>> {
  const commands: Collection<string, Command> = new Collection();
  const foldersPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = await import(pathToFileURL(filePath).href);
      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
      } else {
        console.warn(`[bot] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
  return commands;
}