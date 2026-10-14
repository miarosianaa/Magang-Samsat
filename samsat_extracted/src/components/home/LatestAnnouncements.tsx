
import React, { useEffect, useRef, useState } from 'react';
import { useSamsat } from '../../context/SamsatContext';
import { Announcement } from '../../types';
import {
  ArrowUpRight,
  CalendarDays,
  X,
  FileText,
} from 'lucide-react';

export const LatestAnnouncements: React.FC = () => {
  const { announcements } = useSamsat();

  const [selectedAnn, setSelectedAnn] =
    useState<Announcement | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setSelectedAnn(null);
  };

  const openModal = (ann: Announcement) => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setSelectedAnn(ann);
  };

  // Mengatur interaksi modal
  useEffect(() => {
    if (!selectedAnn) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }

      // Menjaga fokus keyboard tetap di dalam modal
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => !element.hasAttribute('disabled'));

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);

      previousFocusRef.current?.focus();
    };
  }, [selectedAnn]);

  return (
    <section
      aria-labelledby="announcements-title"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADING */}
        <div className="mb-10 max-w-3xl">
          <p
            className="
              mb-3 text-xs font-semibold
              uppercase tracking-[0.12em]
              text-[#005BAC]
            "
          >
            Informasi Terkini
          </p>

          <h2
            id="announcements-title"
            className="
              text-2xl font-bold
              tracking-tight text-slate-900
              sm:text-3xl
            "
          >
            Pengumuman & Informasi Terbaru
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            Informasi mengenai kebijakan, jadwal pelayanan,
            dan pengumuman terbaru UPPD/SAMSAT Banyumas.
          </p>
        </div>

        {/* ANNOUNCEMENTS LIST */}
        {announcements.length > 0 ? (
          <div
            className="
              overflow-hidden rounded-xl
              border border-slate-200
              bg-white
            "
          >
            {announcements.map((ann, index) => (
              <button
                key={ann.id}
                type="button"
                onClick={() => openModal(ann)}
                className={`
                  group flex w-full flex-col
                  gap-4 px-5 py-6 text-left
                  transition-colors duration-200
                  hover:bg-[#F5F8FC]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-[-2px]
                  focus-visible:outline-[#005BAC]
                  sm:flex-row sm:gap-8
                  sm:px-8 sm:py-7
                  ${
                    index !== announcements.length - 1
                      ? 'border-b border-slate-100'
                      : ''
                  }
                `}
              >
                {/* DATE */}
                <div className="flex shrink-0 items-start gap-2 text-slate-500 sm:w-32">
                  <CalendarDays
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 text-[#005BAC]"
                  />

                  <span className="text-xs leading-6">
                    {ann.date}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className="
                        rounded-md bg-blue-50
                        px-2.5 py-1
                        text-[11px] font-medium
                        text-[#005BAC]
                      "
                    >
                      {ann.category}
                    </span>

                    {ann.isNew && (
                      <span
                        className="
                          rounded-md border
                          border-amber-200
                          bg-amber-50 px-2.5 py-1
                          text-[11px] font-medium
                          text-amber-700
                        "
                      >
                        Baru
                      </span>
                    )}
                  </div>

                  <h3
                    className="
                      text-base font-semibold
                      leading-snug text-slate-900
                      transition-colors duration-200
                      group-hover:text-[#005BAC]
                      sm:text-lg
                    "
                  >
                    {ann.title}
                  </h3>

                  <p
                    className="
                      mt-2 line-clamp-2
                      max-w-3xl text-sm
                      leading-6 text-slate-600
                    "
                  >
                    {ann.shortDescription}
                  </p>

                  <span
                    className="
                      mt-4 inline-flex
                      items-center gap-2
                      text-xs font-semibold
                      text-[#005BAC]
                    "
                  >
                    Baca selengkapnya

                    <ArrowUpRight
                      aria-hidden="true"
                      className="
                        h-4 w-4
                        transition-transform duration-200
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div
            className="
              rounded-xl border border-slate-200
              bg-slate-50 px-6 py-12 text-center
            "
          >
            <FileText
              aria-hidden="true"
              className="mx-auto mb-4 h-8 w-8 text-slate-400"
            />

            <h3 className="text-base font-semibold text-slate-900">
              Belum ada pengumuman
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Informasi terbaru akan ditampilkan di sini.
            </p>
          </div>
        )}
      </div>

      {/* =================================
          ANNOUNCEMENT DETAIL MODAL
      ================================= */}
      {selectedAnn && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-slate-950/65 p-4
            sm:p-6
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-modal-title"
            aria-describedby="announcement-modal-description"
            className="
              relative flex max-h-[90dvh]
              w-full max-w-2xl
              flex-col overflow-hidden
              rounded-xl bg-white
              shadow-2xl
            "
          >
            {/* MODAL HEADER */}
            <div
              className="
                flex shrink-0 items-start
                justify-between gap-4
                border-b border-slate-100
                px-6 py-5 sm:px-8
              "
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="
                    rounded-md bg-blue-50
                    px-3 py-1 text-xs
                    font-medium text-[#005BAC]
                  "
                >
                  {selectedAnn.category}
                </span>

                <span className="text-xs text-slate-500">
                  {selectedAnn.date}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Tutup pengumuman"
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg text-slate-500
                  transition-colors duration-200
                  hover:bg-slate-100
                  hover:text-slate-900
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-[#005BAC]
                "
              >
                <X
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="overflow-y-auto px-6 py-7 sm:px-8">
              <h2
                id="announcement-modal-title"
                className="
                  text-xl font-bold
                  leading-snug text-slate-900
                  sm:text-2xl
                "
              >
                {selectedAnn.title}
              </h2>

              <div
                id="announcement-modal-description"
                className="mt-6 space-y-5 text-sm leading-7 text-slate-700"
              >
                <p className="font-medium text-slate-900">
                  {selectedAnn.shortDescription}
                </p>

                <div className="border-t border-slate-100 pt-5">
                  <p className="whitespace-pre-line">
                    {selectedAnn.content}
                  </p>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              className="
                flex shrink-0 justify-end
                border-t border-slate-100
                bg-slate-50 px-6 py-4
                sm:px-8
              "
            >
              <button
                type="button"
                onClick={closeModal}
                className="
                  min-h-10 rounded-lg
                  bg-[#005BAC] px-6 py-2.5
                  text-sm font-semibold text-white
                  transition-colors duration-200
                  hover:bg-[#004685]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#005BAC]
                "
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};