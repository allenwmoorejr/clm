import { XMLParser } from "fast-xml-parser";

export async function fetchChannelRss(channelId: string) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch RSS: ${res.status}`);
  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
  const data = parser.parse(xml);
  return data;
}

export async function detectLiveVideoId(channelId: string) {
  const url = `https://www.youtube.com/channel/${channelId}/live`;
  const res = await fetch(url, { redirect: "manual" as any });
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get("location") || "";
    const m = loc.match(/v=([\w-]{11})/);
    if (m) return m[1];
  }
  return null;
}
