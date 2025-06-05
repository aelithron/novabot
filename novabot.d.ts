export type ClientWithCommands = import('discord.js').Client & {
  commands: import('discord.js').Collection<string, Command>;
}

export type Command = {
  data: import('discord.js').SlashCommandBuilder;
  execute: (interaction: import('discord.js').CommandInteraction) => Promise<void>;
}