
import React from 'react';
import { useSamsat } from '../../context/SamsatContext';

export const PublicSatisfactionStats: React.FC = () => {
  const { stats, serviceLocations, faqs } = useSamsat();

  const statItems = [
    {
      number: '01',
      title: 'Pengunjung Portal',
      value: stats.totalVisitors.toLocaleString('id-ID'),
      description: 'Jumlah akses pengunjung yang tercatat pada portal.'
    },
    {
      number: '02',
      title: 'Titik Pelayanan',
      value: serviceLocations.length.toString(),
      description: 'Lokasi pelayanan SAMSAT yang tersedia dalam direktori.'
    },
    {
      number: '03',
      title: 'Indeks Kepuasan Masyarakat',
      value: `${stats.publicSatisfactionScore.toLocaleString('id-ID')}%`,
      description: 'Nilai hasil survei kepuasan masyarakat.'
    },
    {
      number: '04',
      title: 'Pertanyaan Umum',
      value: faqs.length.toString(),
      description: 'Informasi dan jawaban mengenai pelayanan SAMSAT.'
    }
  ];

  return (
    <section
      aria-labelledby="public-stats-title"
      className="bg-[#102C46] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-sky-300">
            Informasi Statistik
          </p>

          <h2
            id="public-stats-title"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Statistik Pelayanan SAMSAT Banyumas
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Ringkasan informasi pelayanan yang tersedia
            melalui portal SAMSAT Banyumas.
          </p>
        </div>

        {/* STATISTICS GRID */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/20 pt-10 md:grid-cols-4 md:gap-8">
          {statItems.map((item) => (
            <div key={item.number}>
              <span className="text-xs font-medium text-slate-400">
                {item.number}
              </span>

              <p className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {item.value}
              </p>

              <h3 className="mt-3 text-sm font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 max-w-[230px] text-xs leading-6 text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};