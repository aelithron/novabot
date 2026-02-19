# NovaBot
Nova (aka Aelithron)'s personal Discord bot!

<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>

## Bot Features!
- Echoes, a custom canned message system
- Introductions, a fancy formatted intro
- Now Playing, a Jellyfin-based music/movie command to share what you're watching/listening to
- User/Server Lookup, an easy way to put details of a server or user in the Discord chat
- Grab Emoji, the simplest way to download a Discord server emoji
## Setup Guide
Setting up NovaBot is simple! However, due to the bot's personalization, you must run your own personal instance of the bot.
You will have to complete the following steps no matter how you deploy it:
1. Get a Discord bot! This can be easily done by following [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). You will need the Bot Token and Application ID, save them somewhere! You will need them later. You don't need a server ID, though.
2. I **heavily** suggest disabling `Public Bot` on the Bot tab of the developer portal, as otherwise people can run commands on your bot and potentially see things you don't want (say, if a title in your Jellyfin might dox you).
3. Use one of the following options to set up your bot. Once you're done there, go to the "Configuring" section!
### Docker (Recommended)
Docker is the easiest way to run the bot!
#### With Compose
Here's a simple Compose file for the bot.
Make sure to add your token and app ID into the marked places!
```yaml
services:
  novabot:
    image: ghcr.io/aelithron/novabot:latest
    container_name: novabot
    restart: unless-stopped
    environment:
      BOT_TOKEN: (insert Bot Token here)
      CLIENT_ID: (insert Application ID here)
      #JELLYFIN_API_KEY: "(insert Jellyfin API key here)"
      #JELLYFIN_URL: "(insert Jellyfin URL here)"
      #JELLYFIN_USER_NAME: "admin"
    volumes:
      - ./config:/config
```
Once this file is created, run `docker compose up -d`.
#### With `docker run`
An alternative is a Docker run command.
Note that this is harder to change if you want to alter the command later!
Make sure to add your token and app ID into the marked places!
```sh
docker run -d \
  --name novabot \
  --restart unless-stopped \
  -e BOT_TOKEN="(insert Bot Token here)" \
  -e CLIENT_ID="(insert Application ID here)" \
  # -e JELLYFIN_API_KEY="(insert Jellyfin API key here)" \
  # -e JELLYFIN_URL="(insert Jellyfin URL here)" \
  # -e JELLYFIN_USER_NAME="admin" \
  -v "$(pwd)/config:/config" \
  ghcr.io/aelithron/novabot:latest

```
### Other Installation Methods
Anything other than Docker is not officially supported. However, you can DM me on Discord (@aelithron) and I will try to help.
Some basic tips for setting it up:
- Your platform must have Node.JS with NPM (I personally suggest version 21 or higher)
- You must supply environment variables to the bot, namely BOT_TOKEN and CLIENT_ID, but also any Jellyfin configuration you use.
- You must install typescript and tsx globally (`npm install --global typescript tsx`)
- You must clean-install the bot's dependencies (`npm ci`)
- For starting the bot, either run `npm run start` or `tsx index.ts --reload-cmds`
- I recommend auto restarting when crashed, since many things can technically crash the bot and you don't want it to stay broken.
## Configuring
Now, it's time to configure your bot! This is the final required step.
In the original setup guide, your bot should have created a file called `config.json` in the `config` folder, with a bunch of options.
Here, you get to personalize the bot! Some options are documented below.
### Pronouns
This lets you tell the bot how to refer to you! You may know how to enter your pronouns here, but if not, no problem! You can get the options/info you need from [this link](https://en.pronouns.page/pronouns).
### Features
This lets you enable different bot modules! Most of the features are documented near the top of this README.
The only currently configurable module is `media` (Jellyfin stuff, explained below), and it is automatically disabled.
### Introduction
Enter information about yourself for the `/introduce` command. You get to put in a name and a value, which are directly added to the embed.
### Timezone
Type your timezone name and GMT offset following the format provided. For example, I am currently in Mountain Daylight Time with an offset of GMT-6.
### Boundaries
Works similarly to Introduction, except you write a boundary and an explanation of what it means.

**Congrats!** You've finished configuring your bot. Continue on for extra features if you want, or enjoy the bot as it is!
## Jellyfin Setup
Want to use the `/now-playing` command? You must have a Jellyfin server for this to be possible, but no worries! It's easy to set up.
1. Configure a Jellyfin server. A simple guide can be found on [the Jellyfin docs](https://jellyfin.org/docs/general/installation).
2. Once you have your server, go to your Administration Dashboard -> API Keys.
3. In that menu, click the + button and enter your bot's name. It will give you an API key, copy it.
4. Go to your setup command/script/file (depending on how you set up the bot). Uncomment the lines labeled as `JELLYFIN_API_KEY` and `JELLYFIN_URL`.
5. Enter in the API key from step 3 and enter your server's URL in the correct fields.
6. If your Jellyfin username is anything other than `admin` (or you don't want the bot spamming warnings), set the `JELLYFIN_USER_NAME` environment variable to your username.
7. Finally, open your `config.json` and set `features/media` to `true`. Restart your bot, and Jellyfin is now working!

*Want to check out the Slack version? [NovaBot Slack](https://github.com/aelithron/novabot-slack)*
