import { Client, Collection, Events, GatewayIntentBits, ActivityType, MessageFlags } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { ClientWithCommands, Command } from './novabot';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as ClientWithCommands;
client.commands = await loadCommands();

client.once(Events.ClientReady, readyClient => {
  console.log(`[bot] Ready - Logged in (${readyClient.user.tag}) :D`);
  client.user?.setActivity(`nova's thoughts`, { type: ActivityType.Listening });
});
client.login(process.env.BOT_TOKEN);

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

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
      const command = await import(filePath);
      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
      } else {
        console.warn(`[bot] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
  return commands;
}