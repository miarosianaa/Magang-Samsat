import React from 'react';
import { useSamsat } from '../../context/SamsatContext';
import { PageRoute } from '../../types';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useSamsat();

  const quickLinks: { label: string; route: PageRoute }[] = [
    { label: 'Beranda', route: 'home' },
    { label: 'Profil SAMSAT', route: 'profile' },
    { label: 'Titik Layanan', route: 'services' },
    { label: 'Tanya Jawab (FAQ)', route: 'faq' },
    { label: 'Kontak & Pengaduan', route: 'contact' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Slogan */}
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#005BAC] flex items-center justify-center text-white shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">SAMSAT Purwokerto</h3>
                <p className="text-xs text-slate-400">UPPD Kabupaten Banyumas</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pusat Pelayanan Publik Terpadu Pengesahan STNK, Pembayaran Pajak Kendaraan Bermotor (PKB), dan SWDKLLJ Kabupaten Banyumas, Jawa Tengah.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Predikat WBK / WBBM Bebas Pungli</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-l-4 border-[#005BAC] pl-3">Navigasi Utama</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.route}>
                  <button
                    onClick={() => setCurrentPage(item.route)}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 text-slate-400"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#005BAC]" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Office Hours & Contacts */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-l-4 border-[#005BAC] pl-3">Jam Operasional & Kontak</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#005BAC] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-200">Senin - Kamis: 08.00 - 15.00 WIB</p>
                  <p className="font-medium text-slate-200">Jumat: 08.00 - 14.00 WIB</p>
                  <p className="font-medium text-slate-200">Sabtu: 08.00 - 12.00 WIB</p>
                  <p className="text-amber-400 text-xs mt-1">SAMSAT Malam Minggu: 17.00 - 20.00 WIB</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#005BAC] shrink-0" />
                <span>Call Center: (0281) 637801</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#005BAC] shrink-0" />
                <span className="truncate">Up3adbms@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Socials */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base border-l-4 border-[#005BAC] pl-3">Lokasi Kantor Induk</h4>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="w-5 h-5 text-[#005BAC] shrink-0 mt-0.5" />
              <span>Jl. Prof. M. Yamin No.7, Karangklesem, Karangpucung, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53142</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold mb-2">Media Sosial Resmi:</p>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/uppd_purwokerto?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#005BAC] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/uppd.samsat.purwokerto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#005BAC] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@uppdsamsatbanyumas6003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#005BAC] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Youtube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/samsat_bms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#005BAC] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 UPPD / SAMSAT Purwokerto. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Pemerintah Provinsi Jawa Tengah</span>
            <span>•</span>
            <span className="hover:text-slate-400">Polda Jateng</span>
            <span>•</span>
            <span className="hover:text-slate-400">Jasa Raharja</span>
            <span>•</span>
            <button
              onClick={() => {
                window.location.hash = '#admin';
              }}
              className="hover:text-slate-300 underline-offset-2 hover:underline"
              title="Portal khusus petugas SAMSAT"
            >
              Portal Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
