
import React from 'react';
import { useSamsat } from '../../context/SamsatContext';
import {
  FileText,
  MapPin,
  Store,
  Smartphone,
  HelpCircle,
  ReceiptText,
  ArrowUpRight,
} from 'lucide-react';

export const QuickServiceCards: React.FC = () => {
  const {
    setCurrentPage,
    trackAppDownload,
    openSakpoleModal,
  } = useSamsat();

  const cards = [
    {
      number: '01',
      title: 'Alur Pembayaran Pajak',
      description:
        'Informasi tahapan dan persyaratan pembayaran pajak kendaraan bermotor.',
      action: () => setCurrentPage('services'),
      actionLabel: 'Lihat panduan',
    },
    {
      number: '02',
      title: 'Lokasi Pelayanan SAMSAT',
      description:
        'Cari alamat, jam operasional, dan informasi lokasi pelayanan di Banyumas.',
      action: () => setCurrentPage('services'),
      actionLabel: 'Lihat lokasi',
    },
    {
      number: '03',
      title: 'Gerai SAMSAT & BUMDes',
      description:
        'Informasi layanan alternatif melalui gerai SAMSAT dan mitra BUMDes.',
      action: () => setCurrentPage('services'),
      actionLabel: 'Lihat gerai',
    },
    {
      number: '04',
      title: 'Aplikasi SIGNAL',
      description:
        'Layanan Samsat Digital Nasional untuk pengesahan STNK tahunan dan pembayaran pajak.',
      icon: Smartphone,
      action: () => {
        trackAppDownload('signal');
        setCurrentPage('services');
      },
      actionLabel: 'Lihat aplikasi',
    },
    {
      number: '05',
      title: 'Layanan SAKPOLE',
      description:
        'Akses informasi pajak kendaraan dan layanan digital Samsat Jawa Tengah.',
      action: openSakpoleModal,
      actionLabel: 'Akses SAKPOLE',
    },
    {
      number: '06',
      title: 'Pertanyaan Umum',
      description:
        'Jawaban mengenai persyaratan, pembayaran, dan prosedur pelayanan SAMSAT.',
      action: () => setCurrentPage('faq'),
      actionLabel: 'Lihat FAQ',
    },
  ];

  return (
    <section
      aria-labelledby="quick-services-title"
      className="relative bg-[#F4F7FA] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADING */}
        <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">
            {/* Small section label */}
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#005BAC]">
              Informasi & Pelayanan
            </p>

            <h2
              id="quick-services-title"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Layanan SAMSAT Banyumas
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Temukan informasi dan layanan yang Anda perlukan
              untuk mengurus pajak kendaraan bermotor.
            </p>
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => {

            return (
              <button
                key={card.number}
                type="button"
                onClick={card.action}
                aria-label={`${card.title} - ${card.actionLabel}`}
                className="
                  group relative flex h-full min-h-[225px]
                  flex-col items-start overflow-hidden
                  rounded-lg border border-[#DFE6ED]
                  bg-white p-6 text-left
                  transition-all duration-200
                  hover:border-[#005BAC]/40
                  hover:shadow-[0_5px_20px_rgba(15,23,42,0.05)]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#005BAC]
                  sm:p-7
                "
              >
                {/* Small left accent on hover */}
                <span
                  aria-hidden="true"
                  className="
                    absolute left-0 top-0 h-full w-[3px]
                    bg-[#005BAC] opacity-0
                    transition-opacity duration-200
                    group-hover:opacity-100
                    group-focus-visible:opacity-100
                  "
                />

                {/* NUMBER & ICON */}
                <div className="mb-5 flex w-full items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-slate-400">
                    {card.number}
                  </span>
                </div>

                {/* CONTENT */}
                <h3 className="text-base font-semibold leading-snug text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {card.description}
                </p>

                {/* ACTION */}
                <div className="mt-6 flex w-full items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-[#005BAC]">
                    {card.actionLabel}
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="
                      h-4 w-4 text-[#005BAC]
                      transition-transform duration-200
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};