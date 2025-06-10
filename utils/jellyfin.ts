import { Jellyfin } from "@jellyfin/sdk";
import { getSessionApi, getLyricsApi } from "@jellyfin/sdk/lib/utils/api";
import dotenv from "dotenv";
import { MovieState, MusicState, PlayingState } from "../novabot";
dotenv.config();

export default async function getInfo(): Promise<PlayingState> {
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
  let userName = process.env.JELLYFIN_USER_NAME;
  if (!apiURL || !apiKey) {
    throw new Error("JELLYFIN_URL and JELLYFIN_API_KEY must be set in the environment variables.");
  }
  if (!userName) {
    userName = 'admin';
    console.warn('[bot] JELLYFIN_USER_NAME is not set, defaulting to "admin". If this is incorrect, please set it!');
  }
  const servers = await jellyfin.discovery.getRecommendedServerCandidates(apiURL);
  const best = jellyfin.discovery.findBestServer(servers);
  if (!best || !best.address) throw new Error("No suitable Jellyfin server found.");
  const api = jellyfin.createApi(best.address, apiKey);
  const sessionsList = await getSessionApi(api).getSessions({ activeWithinSeconds: 30 });
  sessionsList.data.filter(session => session.UserName === userName);

  let playingInfo: PlayingState = { state: null };
  if (sessionsList.data.length === 0) return playingInfo;
  const session = sessionsList.data[0];
  if (!session.NowPlayingItem) return playingInfo;

  playingInfo = {
    state: null,
    type: session.NowPlayingItem.Type,
    title: session.NowPlayingItem.Name || null,
    isPaused: session.PlayState?.IsPaused || false,
    position: session.PlayState?.PositionTicks ? session.PlayState.PositionTicks / 10000 : null,
    duration: session.NowPlayingItem.RunTimeTicks ? session.NowPlayingItem.RunTimeTicks / 10000 : null,
    cover: `${best.address}Items/${session.NowPlayingItem.ParentId}/Images/Primary`,
  }
  switch (session.NowPlayingItem.Type) {
    case 'Audio':
      playingInfo.state = {
        artist: session.NowPlayingItem.AlbumArtist,
        album: session.NowPlayingItem.Album,
        isSingle: session.NowPlayingItem.Name === session.NowPlayingItem.Album,
      } as MusicState;
      if (session.NowPlayingItem.HasLyrics) {
        const lyrics = await getLyricsApi(api).getLyrics({ itemId: session.NowPlayingItem.Id! });
        (playingInfo.state! as MusicState).lyrics = lyrics.data?.Lyrics || null;
      }
      break;
    case 'Movie':
      playingInfo.state = {
        year: session.NowPlayingItem.ProductionYear,
        imdbId: session.NowPlayingItem.ProviderIds?.Imdb || null,
      } as MovieState;
      break;
    default:
      break;
  }
  await api.logout();
  return playingInfo;
}