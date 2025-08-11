"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type LiveResponse = { live: boolean; videoId?: string; latestId?: string };

export default function WatchPage() {
  const [data, setData] = useState<LiveResponse | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    fetch("/api/live")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ live: false }));
  }, []);

  const videoId = data?.live ? data.videoId : data?.latestId;

  return (
    <section className="container py-16">
      <h1>{data?.live ? "We’re Live Now" : "Watch"}</h1>
      <p className="text-white/70 mt-2">
        {data?.live ? "Thanks for worshiping with us!" : "We’re not live right now — enjoy the latest message below."}
      </p>

      <div className="card overflow-hidden mt-8 relative">
        <div className="aspect-video relative">
          {!showIframe ? (
            <>
              <img src="/live-preview.jpg" alt="CLM Live Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Buttons bottom-left so they don't cover faces */}
              <div className="absolute inset-0 flex items-end justify-start">
                <div className="p-4 md:p-6">
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={
                        videoId
                          ? `https://www.youtube.com/watch?v=${videoId}`
                          : `https://www.youtube.com/channel/${process.env.NEXT_PUBLIC_CHANNEL_ID ?? ""}/live`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      Watch on YouTube
                    </a>
                    {videoId && (
                      <button onClick={() => setShowIframe(true)} className="btn-ghost">
                        Play in Page
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
              title="CLM Live"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        <div className="p-5 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-white/90 font-medium">{data?.live ? "Live Stream" : "Latest Sermon"}</p>
            <p className="text-white/60 text-sm">{data?.live ? "Happening now" : "Most recent upload"}</p>
          </div>
          <Link href="/sermons" className="btn-primary">Browse Sermons</Link>
        </div>
      </div>
    </section>
  );
}

