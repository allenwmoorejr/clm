import { NextResponse } from "next/server";
import { detectLiveVideoId, fetchChannelRss } from "@/lib/youtube";

export async function GET() {
  const channelId = process.env.CHANNEL_ID;
  if (!channelId) return NextResponse.json({ live:false });
  try {
    const videoId = await detectLiveVideoId(channelId);
    if (videoId) return NextResponse.json({ live: true, videoId });
    const rss = await fetchChannelRss(channelId);
    const latest = rss.feed?.entry?.[0];
    const latestId = latest ? (latest["yt:videoId"] || latest["yt:videoid"]) : undefined;
    return NextResponse.json({ live: false, latestId });
  } catch {
    return NextResponse.json({ live: false });
  }
}
