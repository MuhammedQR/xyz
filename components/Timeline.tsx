// components/Timeline.tsx
type Event = { year: string; title: string; text: string };

export default function Timeline({ events }: { events: Event[] }) {
  return (
    <section className="section">
      <div className="container-narrow">
        <ol className="border-s border-white/15 ps-6">
          {events.map((e, i) => (
            <li key={i} className="relative mb-8">
              <span className="absolute -start-2 top-1.5 w-3 h-3 rounded-full bg-brand-500 border border-white/30" />
              <div className="flex items-baseline gap-3">
                <span className="text-brand-300 font-bold">{e.year}</span>
                <h3 className="text-lg font-semibold">{e.title}</h3>
              </div>
              <p className="mt-1 text-white/80">{e.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
