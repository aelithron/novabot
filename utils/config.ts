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
    echoes: z.boolean(),
    weather: z.boolean()
  }),
  introduction: z.object({
    boundaries: z.string().array(),
    fields: z.array(
      z.object({
        name: z.string(),
        value: z.string()
      })
    )
  })
});

export default function getConfig(): Config {
  let validatedConfig;
  try {
    validatedConfig = ConfigSchema.parse(config);
  } catch (e) {
    console.error(`[config] Error loading your config: ${e}`);
  }
  return validatedConfig;
};