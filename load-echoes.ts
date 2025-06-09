import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const echoesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'echoes');

export function loadEchoList(): string[] {
  const files = fs.readdirSync(echoesDir);
  const echoIds: string[] = [];
  for (const file of files) {
    if (file.endsWith('.ts')) {
      const baseName = path.basename(file, '.ts');
      echoIds.push(baseName);
    }
  }
  return echoIds;
}

export async function getEchoModule(id: string) {
  const echoPath = path.resolve(echoesDir, `${id}.ts`);
  try {
    const module = await import(echoPath);
    if (typeof module.echoText !== 'function') throw new Error(`Module "${id}" does not export a valid echoText function.`);
    return module;
  } catch (err) {
    return null;
  }
}