
import React, { useMemo, useState } from 'react';
import { useSamsat } from '../../context/SamsatContext';
import { ServiceLocation } from '../../types';
import { LocationMapModal } from '../shared/LocationMapModal';
import {
  Search,
  MapPin,
  Clock3,
  Phone,
  ArrowRight,
  ExternalLink,
  Smartphone,
  FileText,
  Building2,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Navigation,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const {
    serviceLocations,
    trackLocationClick,
    trackAppDownload,
    openSakpoleModal,
  } = useSamsat();

  const [locationSearch, setLocationSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedLocation, setSelectedLocation] =
    useState<ServiceLocation | null>(null);

  const timelineSteps = [
    {
      title: 'Siapkan dokumen kendaraan',
      description:
        'Persiapkan dokumen identitas dan kendaraan sesuai jenis layanan. Persyaratan pajak tahunan dan perpanjangan lima tahunan dapat berbeda.',
      icon: FileText,
    },
    {
      title: 'Pilih tempat pelayanan',
      description:
        'Datangi kantor SAMSAT atau titik pelayanan yang sesuai dengan kebutuhan Anda. Untuk layanan tertentu, tersedia pula kanal digital.',
      icon: Building2,
    },
    {
      title: 'Pemeriksaan dokumen',
      description:
        'Petugas memeriksa kelengkapan dokumen. Pemeriksaan fisik kendaraan dilakukan apabila diwajibkan untuk jenis layanan yang dipilih.',
      icon: CheckCircle2,
    },
    {
      title: 'Lakukan pembayaran',
      description:
        'Selesaikan pembayaran pajak dan biaya terkait melalui metode pembayaran yang tersedia pada kanal pelayanan.',
      icon: CreditCard,
    },
    {
      title: 'Terima hasil pelayanan',
      description:
        'Terima bukti pembayaran dan dokumen pengesahan sesuai prosedur serta jenis layanan yang digunakan.',
      icon: FileText,
    },
  ];

  const locationTypes = [
    { id: 'all', label: 'Semua Lokasi' },
    { id: 'induk', label: 'Induk & Pembantu' },
    { id: 'drive-thru', label: 'Drive Thru' },
    { id: 'keliling', label: 'SAMSAT Keliling' },
  ];

  const filteredLocations = useMemo(() => {
    const query = locationSearch.trim().toLowerCase();

    return serviceLocations.filter((loc) => {
      const matchesSearch =
        loc.name.toLowerCase().includes(query) ||
        loc.address.toLowerCase().includes(query);

      const matchesType =
        filterType === 'all' || loc.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [serviceLocations, locationSearch, filterType]);

  const handleOpenLocationMap = (loc: ServiceLocation) => {
    trackLocationClick(loc.name);
    setSelectedLocation(loc);
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 pt-32 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* ==============================
            PAGE HEADER
        ============================== */}
        <header className="mb-16 max-w-3xl">
          <div className="mb-4 h-1 w-12 rounded-full bg-[#005BAC]" />

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Informasi Layanan SAMSAT
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Temukan informasi prosedur pembayaran pajak kendaraan,
            lokasi pelayanan, serta layanan digital yang tersedia
            di wilayah Kabupaten Banyumas.
          </p>
        </header>

        {/* ==============================
            SECTION 1: ALUR PELAYANAN
        ============================== */}
        <section
          aria-labelledby="service-steps-title"
          className="mb-24"
        >
          <div className="mb-10">
            <h2
              id="service-steps-title"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Alur Pelayanan Pajak Kendaraan
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Berikut gambaran umum tahapan pelayanan pajak kendaraan
              bermotor. Prosedur dan persyaratan dapat berbeda
              berdasarkan jenis layanan yang dipilih.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className={`
                    grid grid-cols-[44px_1fr] gap-4
                    px-5 py-6
                    sm:grid-cols-[56px_1fr]
                    sm:gap-6 sm:px-8 sm:py-7
                    ${
                      index !== timelineSteps.length - 1
                        ? 'border-b border-slate-100'
                        : ''
                    }
                  `}
                >
                  <div
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-lg bg-blue-50 text-[#005BAC]
                      sm:h-12 sm:w-12
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </div>

                  <div>
                    <span className="mb-1 block text-xs font-semibold text-[#005BAC]">
                      Langkah {index + 1}
                    </span>

                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            Catatan: Pastikan persyaratan dokumen, jenis pelayanan,
            dan metode pembayaran melalui kanal resmi sebelum
            melakukan kunjungan.
          </p>
        </section>

        {/* ==============================
            SECTION 2: LOKASI PELAYANAN
        ============================== */}
        <section
          aria-labelledby="locations-title"
          className="mb-24"
        >
          <div className="mb-8">
            <h2
              id="locations-title"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Lokasi Pelayanan SAMSAT
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Cari informasi alamat, jam pelayanan, dan kontak
              lokasi SAMSAT yang tersedia di wilayah Banyumas.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-lg">
              <Search
                aria-hidden="true"
                className="
                  pointer-events-none absolute left-4 top-1/2
                  h-5 w-5 -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="search"
                aria-label="Cari lokasi pelayanan"
                value={locationSearch}
                onChange={(event) =>
                  setLocationSearch(event.target.value)
                }
                placeholder="Cari nama atau alamat lokasi..."
                className="
                  h-12 w-full rounded-lg
                  border border-slate-200 bg-white
                  pl-12 pr-4 text-sm text-slate-900
                  outline-none transition-colors
                  placeholder:text-slate-400
                  focus:border-[#005BAC]
                  focus:ring-2 focus:ring-blue-100
                "
              />
            </div>

            <div
              aria-label="Filter jenis lokasi pelayanan"
              className="flex flex-wrap gap-2"
            >
              {locationTypes.map((type) => {
                const active = filterType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFilterType(type.id)}
                    aria-pressed={active}
                    className={`
                      min-h-10 rounded-lg border
                      px-4 py-2 text-xs font-semibold
                      transition-colors duration-200
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-blue-600
                      ${
                        active
                          ? 'border-[#005BAC] bg-[#005BAC] text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-[#005BAC]'
                      }
                    `}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>

            <p
              aria-live="polite"
              className="text-xs text-slate-500"
            >
              Menampilkan {filteredLocations.length} dari{' '}
              {serviceLocations.length} lokasi pelayanan
            </p>
          </div>

          {/* Location Cards */}
          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredLocations.map((loc) => (
                <article
                  key={loc.id}
                  className="
                    flex h-full flex-col
                    rounded-xl border border-slate-200
                    bg-white p-6
                    transition-colors duration-200
                    hover:border-blue-300
                  "
                >
                  {/* Location Type */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className="
                        inline-flex rounded-md
                        bg-blue-50 px-2.5 py-1
                        text-[11px] font-semibold
                        text-[#005BAC]
                      "
                    >
                      {loc.type.replace(/-/g, ' ').toUpperCase()}
                    </span>

                    {loc.isDriveThru && (
                      <span
                        className="
                          inline-flex rounded-md
                          bg-slate-100 px-2.5 py-1
                          text-[11px] font-medium
                          text-slate-600
                        "
                      >
                        Drive Thru
                      </span>
                    )}
                  </div>

                  {/* Location Name */}
                  <h3 className="text-lg font-semibold leading-snug text-slate-900">
                    {loc.name}
                  </h3>

                  {loc.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {loc.description}
                    </p>
                  )}

                  {/* Location Details */}
                  <div className="mt-5 flex-1 space-y-3 border-t border-slate-100 pt-5">
                    <div className="flex items-start gap-3">
                      <MapPin
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#005BAC]"
                      />

                      <p className="text-sm leading-6 text-slate-600">
                        {loc.address}
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock3
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#005BAC]"
                      />

                      <p className="text-sm leading-6 text-slate-600">
                        {loc.operatingHours || 'Jadwal belum tersedia'}
                      </p>
                    </div>

                    {loc.phone && (
                      <div className="flex items-start gap-3">
                        <Phone
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#005BAC]"
                        />

                        <p className="text-sm leading-6 text-slate-600">
                          {loc.phone}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Location Action */}
                  <button
                    type="button"
                    onClick={() => handleOpenLocationMap(loc)}
                    className="
                      mt-6 flex w-full min-h-11
                      items-center justify-between
                      rounded-lg border border-slate-200
                      bg-slate-50 px-4 py-3
                      text-sm font-semibold text-[#005BAC]
                      transition-colors duration-200
                      hover:border-blue-200 hover:bg-blue-50
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-blue-600
                    "
                  >
                    <span className="flex items-center gap-2">
                      <Navigation
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                      Lihat Lokasi
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
              <Search
                aria-hidden="true"
                className="mx-auto mb-3 h-7 w-7 text-slate-400"
              />

              <h3 className="text-base font-semibold text-slate-900">
                Lokasi tidak ditemukan
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Coba gunakan kata kunci lain atau ubah filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setLocationSearch('');
                  setFilterType('all');
                }}
                className="mt-5 text-sm font-semibold text-[#005BAC] hover:underline"
              >
                Tampilkan semua lokasi
              </button>
            </div>
          )}
        </section>

        {/* ==============================
            SECTION 3: SAMSAT GERAI
        ============================== */}
        <section
          aria-labelledby="gerai-title"
          className="mb-24"
        >
          <div className="mb-8">
            <h2
              id="gerai-title"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Gerai SAMSAT dan Mitra BUMDes
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Alternatif lokasi pelayanan untuk memudahkan
              masyarakat mengakses layanan pajak kendaraan.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Gerai Image */}
              <div className="min-h-[260px] bg-slate-100 lg:min-h-[380px]">
                <img
                  src="/images/samsat_ritamall.jpeg"
                  alt="Gerai SAMSAT Rita SuperMall Purwokerto"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Gerai Content */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#005BAC]">
                  Alternatif Pelayanan
                </span>

                <h3 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                  Layanan SAMSAT Lebih Dekat dengan Masyarakat
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Gerai SAMSAT dan mitra BUMDes menjadi
                  alternatif lokasi pelayanan bagi masyarakat
                  yang ingin mengurus pajak kendaraan tanpa
                  harus selalu datang ke kantor utama.
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Ketersediaan layanan, persyaratan, dan
                  jadwal operasional mengikuti ketentuan
                  masing-masing lokasi.
                </p>

                <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#005BAC]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Contoh lokasi gerai
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Rita SuperMall Purwokerto
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#005BAC]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Jam pelayanan
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Periksa jadwal terbaru sebelum berkunjung.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ==============================
            SECTION 4: APLIKASI DIGITAL
        ============================== */}
        <section aria-labelledby="apps-title">
          <div className="mb-8">
            <h2
              id="apps-title"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Layanan Digital SAMSAT
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Manfaatkan aplikasi resmi untuk mengakses
              informasi dan layanan pajak kendaraan
              melalui perangkat seluler.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* SIGNAL */}
            <article
              className="
                flex h-full flex-col
                rounded-xl border border-slate-200
                bg-white p-6 sm:p-8
              "
            >
              <div className="mb-6 flex items-start gap-4">
                <div
                  className="
                    flex h-16 w-16 shrink-0
                    items-center justify-center
                    rounded-xl border border-slate-100
                    bg-white p-2
                  "
                >
                  <img
                    src="/images/signal.jpg"
                    alt="Logo SIGNAL"
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    SIGNAL
                  </h3>

                  <p className="mt-1 text-xs font-medium text-[#005BAC]">
                    Samsat Digital Nasional
                  </p>
                </div>
              </div>

              <p className="flex-1 text-sm leading-7 text-slate-600">
                Aplikasi layanan Samsat Digital Nasional
                yang menyediakan fasilitas pengesahan
                STNK tahunan serta pembayaran pajak
                kendaraan bermotor sesuai ketentuan
                yang berlaku.
              </p>

              <div className="mt-7 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => trackAppDownload('signal')}
                  className="
                    flex min-h-12 w-full
                    items-center justify-between
                    rounded-lg bg-[#005BAC]
                    px-5 py-3 text-sm font-semibold
                    text-white
                    transition-colors duration-200
                    hover:bg-[#004685]
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-blue-600
                  "
                >
                  <span className="flex items-center gap-2">
                    <Smartphone
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    Unduh SIGNAL
                  </span>

                  <ExternalLink
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </button>
              </div>
            </article>

            {/* SAKPOLE */}
            <article
              className="
                flex h-full flex-col
                rounded-xl border border-slate-200
                bg-white p-6 sm:p-8
              "
            >
              <div className="mb-6 flex items-start gap-4">
                <div
                  className="
                    flex h-16 w-16 shrink-0
                    items-center justify-center
                    rounded-xl border border-slate-100
                    bg-white p-2
                  "
                >
                  <img
                    src="/images/new_sakpole.jpeg"
                    alt="Logo SAKPOLE"
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    New SAKPOLE
                  </h3>

                  <p className="mt-1 text-xs font-medium text-[#005BAC]">
                    Layanan Pajak Kendaraan Jawa Tengah
                  </p>
                </div>
              </div>

              <p className="flex-1 text-sm leading-7 text-slate-600">
                Layanan digital pajak kendaraan
                Provinsi Jawa Tengah untuk mengakses
                informasi pajak dan fasilitas pembayaran
                sesuai layanan yang tersedia.
              </p>

              <div className="mt-7 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={openSakpoleModal}
                  className="
                    flex min-h-12 w-full
                    items-center justify-between
                    rounded-lg bg-[#005BAC]
                    px-5 py-3 text-sm font-semibold
                    text-white
                    transition-colors duration-200
                    hover:bg-[#004685]
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-blue-600
                  "
                >
                  <span className="flex items-center gap-2">
                    <Smartphone
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    Akses SAKPOLE
                  </span>

                  <ChevronRight
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </button>
              </div>
            </article>

          </div>
        </section>

      </div>

      {/* ==============================
          LOCATION MAP MODAL
      ============================== */}
      {selectedLocation && (
        <LocationMapModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </main>
  );
};