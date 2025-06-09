export type ClientWithCommands = import('discord.js').Client & {
  commands: import('discord.js').Collection<string, Command>;
}

export type Command = {
  data: import('discord.js').SlashCommandBuilder;
  autocomplete?: (interaction: import('discord.js').AutocompleteInteraction) => Promise<void>;
  execute: (interaction: import('discord.js').CommandInteraction) => Promise<void>;
}

export type EchoEmbed = {
  embed: import('discord.js').EmbedBuilder;
  text: string | null;
}

export type NowPlayingState = {
  playing: boolean;
  title?: string | null;
  artist?: string | null;
  album?: string | null;
  cover?: string | null;
  duration?: number | null;
  position?: number | null;
  isPaused?: boolean;
}