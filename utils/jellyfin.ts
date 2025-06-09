import { Jellyfin } from "@jellyfin/sdk";
import { getSessionApi } from "@jellyfin/sdk/lib/utils/api";
import dotenv from "dotenv";
import { NowPlayingState } from "../novabot";
import { PlayerStateInfo } from "@jellyfin/sdk/lib/generated-client/models";
dotenv.config();

export default async function getInfo(): Promise<NowPlayingState> {
  const jellyfin = new Jellyfin({
    clientInfo: {
      name: 'NovaBot',
      version: process.version,
    },
    deviceInfo: {
      name: 'NovaBot Discord Bot',
      id: `novabot-${process.env.CLIENT_ID || 'unknown'}`,
    }
  });
  const apiURL = process.env.JELLYFIN_URL;
  const apiKey = process.env.JELLYFIN_API_KEY;
  const userName = process.env.JELLYFIN_USER_NAME || 'admin';
  if (!apiURL || !apiKey) {
    throw new Error("JELLYFIN_URL and JELLYFIN_API_KEY must be set in the environment variables.");
  }
  if (!userName) {
    console.warn('JELLYFIN_USER_NAME is not set, defaulting to "admin". If this is incorrect, please set it!');
  }
  const servers = await jellyfin.discovery.getRecommendedServerCandidates(apiURL);
  const best = jellyfin.discovery.findBestServer(servers);
  if (!best || !best.address) throw new Error("No suitable Jellyfin server found.");
  const api = jellyfin.createApi(best.address, apiKey);
  const sessionsList = await getSessionApi(api).getSessions({ activeWithinSeconds: 30 });
  sessionsList.data.filter(session => session.UserName === userName);

  let playingInfo: NowPlayingState = { playing: false };
  if (sessionsList.data.length === 0) return playingInfo;
  const session = sessionsList.data[0];
  if (!session.NowPlayingItem) return playingInfo;
  playingInfo = { 
    playing: true,
    title: session.NowPlayingItem.Name, 
    artist: session.NowPlayingItem.AlbumArtist, 
    album: session.NowPlayingItem.Album,
    duration: session.NowPlayingItem.RunTimeTicks ? session.NowPlayingItem.RunTimeTicks / 10000 : null,
    position: session.PlayState?.PositionTicks ? session.PlayState.PositionTicks / 10000 : null,
    isPaused: session.PlayState?.IsPaused,
  };
  await api.logout();
  return playingInfo;
}