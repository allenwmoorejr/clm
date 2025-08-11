import Image from "next/image";

export function PastorCard() {
  return (
    <div className="card overflow-hidden ring-1 ring-white/5">
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-b-none">
        <Image
          src="/pastor.jpg"
          alt="Pastor"
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>
      <div className="p-5 border-t border-white/10">
        <h3 className="text-xl font-semibold">Welcome</h3>
        <p className="text-white/70 mt-1 text-sm">We’re glad you’re here.</p>
      </div>
    </div>
  );
}
