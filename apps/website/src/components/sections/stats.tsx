"use client";

import { STATS } from "~/constants/content";

export function Stats() {
  return (
    <section className="border-y border-black/5 bg-zinc-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
