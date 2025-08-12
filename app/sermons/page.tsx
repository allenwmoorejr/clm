"use client";
import { useEffect, useMemo, useState } from "react";

type Video = { id: string; title: string; published: string; thumbnail: string; };

export default function SermonsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [q, setQ] = useState("");

  useEffect(()=>{ fetch("/api/videos?limit=36").then(r=>r.json()).then(d=>setVideos(d.items || [])).catch(()=>{}); },[]);

  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if (!s) return videos;
    return videos.filter(v => v.title.toLowerCase().includes(s));
  }, [videos, q]);

  return (
    <section className="container py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1>Sermon Library</h1>
          <p className="text-white/70 mt-2">Search and play recent messages.</p>
        </div>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search titles…"
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 ring-brand-600 min-w-[260px]"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filtered.map(v => (
          <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" className="card overflow-hidden group">
            <div className="aspect-video overflow-hidden">
              <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <div className="p-4">
              <h3 className="text-base line-clamp-2">{v.title}</h3>
              <p className="text-xs text-white/60 mt-1">{new Date(v.published).toLocaleDateString()}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
