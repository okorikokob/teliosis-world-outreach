import Image from 'next/image';

export default function WorshipWithUsSection() {
  const services = [
    {
      name: 'Supernatural Impact',
      day: 'Sundays',
      time: '8:00 AM & 10:00 AM',
      image: '/images/home/banner-img-03.jpg',
    },
    {
      name: 'School of the Spirit',
      day: 'Wednesdays',
      time: '6:00 PM',
      image: '/images/home/about-us-img-1.jpg',
    },
    {
      name: 'School of Prayer, Prophecy and Miracles',
      day: 'Thursdays',
      time: '6:00 PM',
      image: '/images/home/about-us-img-2.jpg',
    },
    {
      name: 'THE DEEP',
      day: 'First Saturdays (Monthly)',
      time: '7:00 AM',
      image: '/images/home/banner-img-03.jpg',
    },
    {
      name: 'Morning Devotion',
      day: 'Daily',
      time: '6:30 AM – 7:00 AM',
      image: '/images/home/hero-bg.jpg',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20  section-bg-worship  ">
      <div className="absolute inset-0 " aria-hidden="true" />
      <div className="relative layout-container--wide">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="eyebrow text-color-primary font-fira-condensed font-bold ">Worship with us</p>
          <h2 className="h2 mt-2 font-fira-condensed text-color-accent-foreground">Service Times</h2>
        </div>

  <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {services.map((s, idx) => (
            <li key={idx} className="group relative rounded-br-[2rem] overflow-hidden border border-color-border bg-white transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg">
              <article className="relative h-64 sm:h-72">
                <Image
                  src={s.image}
                  alt={`${s.name} - ${s.day} ${s.time}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:transition-opacity"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                {/* <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-color-primary text-color-primary-foreground px-3 py-1 text-xs font-semibold shadow">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{s.day}</span>
                </div> */}

                <div className="absolute inset-0 flex flex-col items-center justify-between p-5">
                  {/* Top Icon */}
                  <div className="mt-1 flex items-center justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-color-primary text-color-primary-foreground shadow-lg ring-4 ring-black/20 backdrop-blur-sm">
                      {s.name === 'Supernatural Impact' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                        </svg>
                      )}
                      {s.name === 'School of the Spirit' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                          <path d="M12 22s8-4 8-10a8 8 0 10-16 0c0 6 8 10 8 10z" />
                        </svg>
                      )}
                      {s.name === 'School of Prayer, Prophecy and Miracles' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l3 3" />
                        </svg>
                      )}
                      {s.name === 'THE DEEP' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                          <path d="M3 12s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                      {s.name === 'Morning Devotion' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                          <path d="M12 3v4" />
                          <path d="M12 17v4" />
                          <path d="M3 12h4" />
                          <path d="M17 12h4" />
                          <path d="M5.6 5.6l2.8 2.8" />
                          <path d="M15.6 15.6l2.8 2.8" />
                          <path d="M18.4 5.6l-2.8 2.8" />
                          <path d="M8.4 15.6l-2.8 2.8" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </span>
                  </div>
                  {/* Middle Title */}
                  <div className="text-center px-2">
                    <h3 className="h4 font-fira-condensed text-white md:text-[var(--color-foreground)] md:group-hover:text-white drop-shadow mb-1 leading-snug">
                      {s.name}
                    </h3>
                  </div>
                  {/* Bottom Day + Time */}
                  <div className="w-full text-center">
                    <p className="body-sm text-white/90 md:text-[var(--color-text-muted)] md:group-hover:text-white/90 font-fira-condensed font-bold tracking-wide ">
                      {s.day}
                    </p>
                    <p className="body-sm text-white/80 md:text-[var(--color-text-muted)] md:group-hover:text-white/80 font-fira-condensed">{s.time}</p>
                  </div>
                </div>
              </article>

              <a
                href="#services"
                aria-label={`${s.name} details`}
                className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] rounded-br-[2rem]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
