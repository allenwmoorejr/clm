"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

type NavItem = { href: Route; label: string };

const nav: NavItem[] = [
  { href: "/" as Route, label: "Home" },
  { href: "/watch" as Route, label: "Watch Live" },
  { href: "/sermons" as Route, label: "Sermons" },
  { href: "/beliefs" as Route, label: "Beliefs" },
  { href: "/pastor" as Route, label: "Pastor" },
  { href: "/prayer" as Route, label: "Prayer" },
  { href: "/give" as Route, label: "Give" },
];

export function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
      <div className="container flex items-center justify-between h-16">
        <Link href={"/" as Route} className="font-semibold tracking-tight text-lg">
          CLM <span className="text-white/60 ml-2 text-sm">Christ Like Ministries</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm hover:text-white ${path === item.href ? "text-white" : "text-white/70"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={"/watch" as Route} className="btn-primary md:inline-flex hidden">
          Watch Live
        </Link>
      </div>
    </header>
  );
}
