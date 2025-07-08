import { Config } from '../novabot';
import config from '../config.json'
import { z } from 'zod'

const ConfigSchema = z.object({
  owner: z.object({
    id: z.string(),
    name: z.string(),
    pronouns: z.object({
      subjective: z.string(),
      objective: z.string(),
      possessive_determiner: z.string(),
      possessive_pronoun: z.string(),
      reflexive: z.string()
    })
  }),
  features: z.object({
    media: z.boolean(),
    echoes: z.boolean()
  }),
  introduction: z.record(z.string(), z.string()),
  boundaries: z.record(z.string(), z.string()),
});

export default function getConfig(): Config {
  let validatedConfig: Config;
  try {
    validatedConfig = ConfigSchema.parse(config) as Config;
  } catch (e) {
    console.error(`[config] Error loading your config: ${e}`);
    process.exit(1);
  }
  return validatedConfig;
};