# NovaBot
Nova (aka Aelithron)'s personal Discord bot!
## Setup Guide
Setting up NovaBot is simple! However, due to the bot's personalization, you must run your own personal instance of the bot.
You will have to complete the following steps no matter how you deploy it:
1. Get a Discord bot! This can be easily done by following [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). You will need the Bot Token and Application ID, save them somewhere! You will need them later.
2. Use one of the following options to set up your bot:
### Docker (Recommended)
Docker is the easiest way to run the bot!
#### With Compose
Here's a simple Compose file for the bot.
Make sure to add your token and app ID into the marked places!
```yaml

```
#### With `docker run`
An alternative is a Docker run command.
Note that this is harder to change if you want to alter the command later!
Make sure to add your token and app ID into the marked places!
```sh

```
## Jellyfin Setup
Want to use the `/now-playing` command? You must have a Jellyfin server for this to be possible, but no worries! It's easy to set up.
1. Configure a Jellyfin server. A simple guide can be found on [the Jellyfin docs](https://jellyfin.org/docs/general/installation).
2. Once you have your server, go to your Administration Dashboard -> API Keys.
3. In that menu, click the + button and enter your bot's name. It will give you an API key, copy it.
4. Go to your setup command/script/file (depending on how you set up the bot). Uncomment the lines labeled as `JELLYFIN_API_KEY` and `JELLYFIN_URL`.
5. Enter in the API key from step 3 and enter your server's URL in the correct fields.
6. Finally, open your `config.json` and set `features/media` to `true`. Restart your bot, and Jellyfin is now working!