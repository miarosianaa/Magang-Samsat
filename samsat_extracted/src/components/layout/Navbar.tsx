
import React, { useState, useEffect, useRef } from 'react';
import { useSamsat } from '../../context/SamsatContext';
import { PageRoute } from '../../types';
import {
  Bell,
  Menu,
  X,
  ArrowRight,
  ReceiptText,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [bellAnimating, setBellAnimating] = useState(false);
  const {
    currentPage,
    setCurrentPage,
    announcements,
    hasNewNotification,
    clearNotificationBadge,
    openSakpoleModal,
  } = useSamsat();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'Beranda', route: 'home' },
    { label: 'Profil', route: 'profile' },
    { label: 'Layanan', route: 'services' },
    { label: 'FAQ', route: 'faq' },
    { label: 'Kontak', route: 'contact' },
  ];

  // Mendeteksi posisi scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Menutup dropdown ketika klik di luar
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Menutup menu dengan tombol Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (notificationOpen) {
          setNotificationOpen(false);
          notificationButtonRef.current?.focus();
        }

        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [notificationOpen]);

  // Navigasi halaman
  const handleNavClick = (route: PageRoute) => {
    setCurrentPage(route);
    setMobileMenuOpen(false);
    setNotificationOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Membuka / menutup notifikasi
  const handleNotificationClick = () => {
    const willOpen = !notificationOpen;

    setNotificationOpen(willOpen);
    setMobileMenuOpen(false);

    if (willOpen && hasNewNotification) {
      clearNotificationBadge();
    }
  };

  // Membuka modal SAKPOLE
  const handleSakpoleClick = () => {
    setMobileMenuOpen(false);
    setNotificationOpen(false);
    openSakpoleModal();
  };

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        h-[76px] lg:h-20
        border-b transition-all duration-300
        ${
          isScrolled || mobileMenuOpen || notificationOpen
            ? 'border-white/10 bg-slate-950/95 shadow-lg shadow-black/10 backdrop-blur-xl'
            : 'border-white/10 bg-slate-950/30 backdrop-blur-sm'
        }
      `}
    >
      <div className="mx-auto h-full w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-full items-center justify-between gap-5">

          {/* ================= LOGO ================= */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            aria-label="Kembali ke Beranda"
            className="
              flex shrink-0 items-center rounded-lg
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-sky-300
            "
          >
            <img
              src="/logo-bapenda.png"
              alt="Bapenda Provinsi Jawa Tengah"
              className="h-10 w-auto object-contain sm:h-11 lg:h-12"
            />
          </button>

          {/* ============== DESKTOP NAV ============== */}
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.route;

              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    group relative flex h-20 items-center
                    text-[13px] font-semibold
                    tracking-[0.01em]
                    transition-colors duration-200
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-sky-300
                    ${
                      isActive
                        ? 'text-sky-300'
                        : 'text-slate-200 hover:text-white'
                    }
                  `}
                >
                  {item.label}

                  {/* Garis bawah menu aktif */}
                  <span
                    className={`
                      absolute bottom-[17px] left-0
                      h-[2px] rounded-full bg-sky-400
                      transition-all duration-200
                      ${
                        isActive
                          ? 'w-full opacity-100'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-70'
                      }
                    `}
                  />
                </button>
              );
            })}
          </nav>

          {/* ============== RIGHT ACTIONS ============== */}
          <div className="flex shrink-0 items-center gap-3">

            {/* ============== NOTIFICATION ============== */}
            <div
              ref={notificationRef}
              className="relative"
            >
              <button
                ref={notificationButtonRef}
                type="button"
                onClick={handleNotificationClick}
                aria-label={
                  hasNewNotification
                    ? 'Pengumuman, ada informasi baru'
                    : 'Pengumuman dan informasi'
                }
                aria-expanded={notificationOpen}
                aria-controls={
                  notificationOpen
                    ? 'navbar-notifications'
                    : undefined
                }
                className={`
                  group relative flex h-10 w-10
                  items-center justify-center
                  rounded-xl border
                  transition-all duration-300
                  hover:scale-105
                  active:scale-95
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-sky-300
                  ${
                    notificationOpen
                      ? 'border-sky-400/40 bg-sky-400/15 text-sky-300'
                      : 'border-white/15 bg-white/5 text-slate-200 hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-300'
                  }
                `}
              >
                {/* Efek lonceng */}
                <Bell
                  aria-hidden="true"
                  className={`
                    h-[18px] w-[18px]
                    transition-colors duration-300
                    ${
                      hasNewNotification
                        ? 'notification-bell-new'
                        : 'notification-bell-idle'
                    }
                  `}
                />

                {/* Titik notifikasi dengan pulse */}
                {hasNewNotification && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute right-1 top-1
                      flex h-3 w-3
                      items-center justify-center
                    "
                  >
                    <span
                      className="
                        absolute inline-flex
                        h-full w-full
                        animate-ping rounded-full
                        bg-amber-400/40
                        motion-reduce:animate-none
                      "
                    />

                    <span
                      className="
                        notification-dot
                        relative h-2 w-2
                        rounded-full bg-amber-400
                        ring-2 ring-slate-950
                      "
                    />
                  </span>
                )}
              </button>

              {/* ============== DROPDOWN ============== */}
              {notificationOpen && (
                <div
                  id="navbar-notifications"
                  role="region"
                  aria-label="Daftar pengumuman terbaru"
                  className="
                    notification-dropdown-enter
                    absolute right-0 top-full z-50 mt-3
                    w-[min(350px,calc(100vw-24px))]
                    overflow-hidden rounded-2xl
                    border border-slate-700/80
                    bg-slate-900 text-white
                    shadow-2xl shadow-black/30
                  "
                >
                  {/* Header dropdown */}
                  <div
                    className="
                      flex items-center justify-between
                      border-b border-white/10
                      px-5 py-4
                    "
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Bell
                          aria-hidden="true"
                          className="h-4 w-4 text-sky-300"
                        />

                        <h3 className="text-sm font-bold">
                          Pengumuman
                        </h3>
                      </div>

                      <p className="mt-1.5 text-[11px] text-slate-400">
                        Informasi terbaru UPPD Banyumas
                      </p>
                    </div>

                    <span
                      className="
                        rounded-lg bg-white/10
                        px-2.5 py-1 text-[11px]
                        font-medium text-slate-300
                      "
                    >
                      {announcements.length} Info
                    </span>
                  </div>

                  {/* Daftar pengumuman */}
                  <div
                    className="
                      max-h-72 divide-y divide-white/10
                      overflow-y-auto
                    "
                  >
                    {announcements.length > 0 ? (
                      announcements.slice(0, 4).map((ann) => (
                        <button
                          key={ann.id}
                          type="button"
                          onClick={() => handleNavClick('home')}
                          className="
                            group/item block w-full
                            px-5 py-3.5 text-left
                            transition-colors duration-200
                            hover:bg-white/5
                          "
                        >
                          <div
                            className="
                              mb-1.5 flex items-center
                              justify-between gap-3
                            "
                          >
                            <span className="text-[11px] text-slate-400">
                              {ann.date}
                            </span>

                            {ann.isNew && (
                              <span
                                className="
                                  rounded-md bg-sky-400/10
                                  px-2 py-0.5
                                  text-[10px] font-semibold
                                  text-sky-300
                                "
                              >
                                Baru
                              </span>
                            )}
                          </div>

                          <h4
                            className="
                              line-clamp-1 text-xs
                              font-semibold text-white
                              transition-colors duration-200
                              group-hover/item:text-sky-300
                            "
                          >
                            {ann.title}
                          </h4>

                          <p
                            className="
                              mt-1 line-clamp-2
                              text-[11px] leading-relaxed
                              text-slate-400
                            "
                          >
                            {ann.shortDescription}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div
                        className="
                          flex flex-col items-center
                          justify-center px-5 py-8
                          text-center
                        "
                      >
                        <Bell
                          aria-hidden="true"
                          className="mb-3 h-6 w-6 text-slate-500"
                        />

                        <p className="text-xs font-medium text-slate-300">
                          Belum ada pengumuman
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500">
                          Informasi terbaru akan tampil di sini.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Lihat semua pengumuman */}
                  <button
                    type="button"
                    onClick={() => handleNavClick('home')}
                    className="
                      group/all flex w-full
                      items-center justify-center gap-2
                      border-t border-white/10
                      bg-white/[0.03] px-4 py-3.5
                      text-xs font-semibold text-sky-300
                      transition-colors duration-200
                      hover:bg-white/10
                    "
                  >
                    Lihat Semua Pengumuman

                    <ChevronRight
                      aria-hidden="true"
                      className="
                        h-4 w-4
                        transition-transform duration-200
                        group-hover/all:translate-x-1
                      "
                    />
                  </button>

                </div>
              )}
            </div>

            {/* ============== SAKPOLE CTA ============== */}
            <button
              type="button"
              onClick={handleSakpoleClick}
              className="
                group hidden min-h-10
                items-center justify-center gap-2
                rounded-xl bg-sky-400
                px-5 py-2.5
                text-xs font-bold text-slate-950
                shadow-lg shadow-sky-500/15
                transition-all duration-200
                hover:bg-sky-300
                hover:shadow-sky-400/25
                active:scale-[0.98]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-sky-300
                sm:inline-flex
              "
            >
              <ReceiptText
                aria-hidden="true"
                className="h-4 w-4"
              />

              <span>Cek Pajak Kendaraan</span>

              <ArrowRight
                aria-hidden="true"
                className="
                  h-3.5 w-3.5
                  transition-transform duration-200
                  group-hover:translate-x-1
                "
              />
            </button>

            {/* ============== MOBILE MENU BUTTON ============== */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setNotificationOpen(false);
              }}
              aria-label={
                mobileMenuOpen ? 'Tutup menu' : 'Buka menu'
              }
              aria-expanded={mobileMenuOpen}
              aria-controls={
                mobileMenuOpen
                  ? 'navbar-mobile-menu'
                  : undefined
              }
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl border border-white/15
                bg-white/5 text-white
                transition-colors duration-200
                hover:border-sky-400/30
                hover:bg-white/10
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-sky-300
                lg:hidden
              "
            >
              {mobileMenuOpen ? (
                <X
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              ) : (
                <Menu
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* ============== MOBILE NAVIGATION ============== */}
      {mobileMenuOpen && (
        <nav
          id="navbar-mobile-menu"
          aria-label="Navigasi mobile"
          className="
            max-h-[calc(100dvh-76px)]
            overflow-y-auto border-t border-white/10
            bg-slate-950 px-5 py-4
            text-white shadow-xl
            sm:px-8 lg:hidden
          "
        >
          <div className="mx-auto max-w-7xl space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;

              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    flex w-full items-center
                    justify-between rounded-xl
                    px-4 py-3.5 text-left
                    text-sm font-semibold
                    transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-sky-400/10 text-sky-300'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <span>{item.label}</span>

                  <ChevronRight
                    aria-hidden="true"
                    className={`
                      h-4 w-4
                      ${
                        isActive
                          ? 'text-sky-300'
                          : 'text-slate-500'
                      }
                    `}
                  />
                </button>
              );
            })}

            {/* Tombol pajak khusus mobile */}
            <div className="pt-4 sm:hidden">
              <button
                type="button"
                onClick={handleSakpoleClick}
                className="
                  flex w-full items-center
                  justify-center gap-2
                  rounded-xl bg-sky-400
                  px-5 py-3.5
                  text-sm font-bold text-slate-950
                  transition-colors duration-200
                  hover:bg-sky-300
                  active:scale-[0.98]
                "
              >
                <ReceiptText
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                <span>Cek Pajak Kendaraan</span>

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};