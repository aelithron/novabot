import getConfig from "../utils/config";

const config = getConfig();
export function echoText(): string {
  return `the thing you sent broke <@${config.owner.id}>'s brain\n` +
    '# w h a t';
};