import { BaseItemKind, LyricLine } from '@jellyfin/sdk/lib/generated-client/models';

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
  components?: import('discord.js').ActionRowBuilder<import('discord.js').ButtonBuilder>[] | null;
}

export type PlayingState = {
  state: MusicState | MovieState | null | "failed-connect";
  type?: BaseItemKind | null;
  isPaused?: boolean;
  title?: string | null;
  cover?: string | null;
  duration?: number | null;
  position?: number | null;
}
export type MusicState = {
  artist?: string | null;
  album?: string | null;
  lyrics?: LyricLine[] | null;
  isSingle?: boolean;
}
export type MovieState = {
  year?: string | null;
  imdbId?: string | null;
}