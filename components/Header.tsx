"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch Live" },
  { href: "/sermons", label: "Sermons" },
  { href: "/beliefs", label: "Beliefs" },
  { href: "/pastor", label: "Pastor" },
  { href: "/prayer", label: "Prayer" },
  { href: "/give", label: "Give" },
];

export function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          CLM <span className="text-white/60 ml-2 text-sm">Christ Like Ministries</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(item => (
            <Link key={item.href} href={item.href}
              className={`text-sm hover:text-white ${path === item.href ? "text-white" : "text-white/70"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/watch" className="btn-primary md:inline-flex hidden">Watch Live</Link>
      </div>
    </header>
  );
}



