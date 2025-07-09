import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z, ZodType } from 'zod';
import type { Config, GMTOffset } from '../novabot.js';

const gmtOffsetRegex = /^[-+](?:0?\d(?:\.5|\.75)?|1[0-3](?:\.5)?|14)$/;
const gmtOffsetSchema = z
  .string()
  .regex(gmtOffsetRegex, {
    message: "Must be a valid GMT offset between -12 and +14 (e.g. '+5.5', '-3.75')"
  }) as unknown as ZodType<GMTOffset>;
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
    media: z.boolean()
  }),
  introduction: z.record(z.string(), z.string()),
  timezone: z.object({
    name: z.string(),
    gmtOffset: gmtOffsetSchema
  }),
  boundaries: z.record(z.string(), z.string())
});

export default function getConfig(): Config {
  const configFolder = path.join(path.dirname(fileURLToPath(import.meta.url)), '../config');
  const configPath = path.join(configFolder, 'config.json');
  if (!fs.existsSync(configPath)) {
    console.warn('[config] Copying example config...');
    if (!fs.existsSync(configFolder)) fs.mkdirSync(configFolder);
    fs.copyFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../example.config.json'), configPath);
  }
  try {
    return ConfigSchema.parse(JSON.parse(fs.readFileSync(configPath, 'utf-8')));
  } catch (e) {
    console.error('[config] Failed to parse/validate config:\n' + e);
    process.exit(1);
  }
}
