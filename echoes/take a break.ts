import getConfig from "../utils/config";

const config = getConfig();
export function echoText(): string {
  return `Hey, ${config.owner.name} (<@${config.owner.id}>) thinks it might be a good idea to take a break!\n` +
    'No pressure, but it might be a good idea to step away for a bit and relax.';
};