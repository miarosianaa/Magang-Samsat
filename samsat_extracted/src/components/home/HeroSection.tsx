
import React from 'react';
import { useSamsat } from '../../context/SamsatContext';
import {
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Zap,
  Award,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, openSakpoleModal } = useSamsat();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-slate-950 text-white sm:min-h-[620px] lg:min-h-[680px]"
    >
      {/* Background foto UPPD */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-[position:60%_center] lg:bg-center"
        style={{
          backgroundImage: "url('/images/uppd1.jpg')",
        }}
      >
        {/* Gradient: teks jelas, foto kantor tetap terlihat */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/25" />

        {/* Lapisan ringan untuk menjaga kontras */}
        <div className="absolute inset-0 bg-slate-950/10" />
      </div>

      {/* Kontainer utama */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="max-w-[680px]">

          {/* Sambutan */}
          <p className="mb-5 text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-sky-300 sm:text-sm">
           UPPD / SAMSAT KABUPATEN BANYUMAS
          </p>

          {/* Judul utama */}
          <h1
            id="hero-title"
            className="max-w-[750px] text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.14] tracking-[-0.035em]"
            >
            Informasi dan Layanan{' '}
            <span className="block bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              Pajak Kendaraan Bermotor
            </span>
          </h1>

          {/* Deskripsi */}
          <p className="mt-6 max-w-[580px] text-sm font-normal leading-7 text-slate-200 sm:text-base sm:leading-8">
            Temukan informasi persyaratan, prosedur, dan layanan administrasi kendaraan bermotor di Kabupaten Banyumas
          </p>

          {/* Tombol aksi */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">

            {/* CTA Utama */}
            <button
              type="button"
              onClick={() => setCurrentPage('services')}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-sky-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-xl hover:shadow-sky-400/25 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
            >
              <span>Jelajahi Layanan</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

            {/* CTA Sekunder */}
            <button
              type="button"
              onClick={openSakpoleModal}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
            >
              <span>Cek Pajak via SAKPOLE</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};