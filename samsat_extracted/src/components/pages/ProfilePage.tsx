import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Target,
  Network,
  UserCheck,
  Users,
  ScrollText,
  ShieldCheck,
  CheckCircle2,
  Award,
  ChevronRight,
  Crown,
  HeartHandshake,
  Zap,
  Compass,
  X,
  FileText,
  Check
} from 'lucide-react';

type ProfileSection = 'vision' | 'territory' | 'history' | 'structure' | 'organizer' | 'implementer' | 'charter' | 'sop' | 'sipp';

interface PersonDetail {
  role: string;
  name: string;
  image: string;
}

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileSection>('vision');
  const [performanceTab, setPerformanceTab] = useState<'apbd' | 'pad'>('apbd');
  
  // State untuk modal zoom struktur organisasi & grafik kinerja
  const [selectedPerson, setSelectedPerson] = useState<PersonDetail | null>(null);

  // Menu Navigasi dengan Wilayah Kerja & Jenis Pendapatan tepat di bawah Visi & Misi
  const menuItems: { id: ProfileSection; label: string }[] = [
    { id: 'vision', label: 'Visi & Misi' },
    { id: 'territory', label: 'Wilayah Kerja & Jenis Pendapatan' },
    { id: 'history', label: 'Sejarah SAMSAT' },
    { id: 'structure', label: 'Struktur Organisasi' },
    { id: 'organizer', label: 'Profil Penyelenggara' },
    { id: 'implementer', label: 'Penilaian Kinerja' },
    { id: 'charter', label: 'Maklumat Pelayanan' },
    { id: 'sop', label: 'Standar Operasional Prosedur' },
    { id: 'sipp', label: 'SIPP Pelayanan Publik' },
  ];

  return (
    <div className="pt-28 pb-16 bg-slate-50 min-h-screen relative">
      
      {/* ================= MODAL ZOOM POP-UP (KONDISIONAL: STRUKTUR ORANG VS TABEL APBD) ================= */}
      <AnimatePresence>
        {selectedPerson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPerson(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 overflow-hidden flex flex-col ${
                selectedPerson.role === 'Grafik Kinerja'
                  ? 'max-w-5xl w-full max-h-[92vh]'
                  : 'max-w-md w-full text-center'
              }`}
            >
              <button
                onClick={() => setSelectedPerson(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-full transition-colors z-20 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Jika yang diklik adalah Tabel APBD (Grafik Kinerja) */}
              {selectedPerson.role === 'Grafik Kinerja' ? (
                <div className="flex flex-col h-full overflow-hidden text-left">
                  <div className="mb-3 pr-10">
                    <span className="text-xs font-black text-[#005BAC] bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
                      Detail Dokumen
                    </span>
                    <h3 className="font-black text-xl text-slate-900 tracking-tight">
                      {selectedPerson.name}
                    </h3>
                  </div>

                  {/* Area Kotak Gambar Penuh Utuh Tanpa Terpotong Bulat */}
                  <div className="relative bg-slate-100 border border-slate-200 rounded-2xl p-4 overflow-auto flex-grow flex items-center justify-center my-2 max-h-[70vh]">
                    <img
                      src={selectedPerson.image}
                      alt={selectedPerson.name}
                      className="w-auto h-auto max-w-full max-h-[65vh] object-contain rounded-xl shadow-sm bg-white"
                    />
                  </div>
                </div>
              ) : (
                /* Jika yang diklik adalah Profil Orang (Struktur Organisasi) */
                <div className="py-4">
                  <div className="relative inline-block mx-auto mb-4 mt-2">
                    <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl"></div>
                    <img
                      src={selectedPerson.image}
                      alt={selectedPerson.name}
                      className="relative w-32 h-32 object-cover rounded-full border-4 border-blue-50 shadow-xl mx-auto bg-white"
                    />
                  </div>

                  <span className="text-xs font-black text-[#005BAC] bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
                    {selectedPerson.role}
                  </span>
                  <h3 className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
                    {selectedPerson.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                    Unit Pelayanan Pendapatan Daerah (UPPD) Kabupaten Banyumas Badan Pengelola Pendapatan Daerah Provinsi Jawa Tengah.
                  </p>
                </div>
              )}

              <button
                onClick={() => setSelectedPerson(null)}
                className="mt-4 w-full bg-[#005BAC] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/30 text-sm shrink-0"
              >
                Tutup Detail
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#005BAC] bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Profil Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Profil SAMSAT Kabupaten Banyumas
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Unit Pelayanan Pendapatan Daerah (UPPD) Kabupaten Banyumas Badan Pengelola Pendapatan Daerah Provinsi Jawa Tengah.
          </p>
        </div>

        {/* Sidebar + Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm sticky top-28">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-3 pb-3 mb-2 border-b border-slate-100">
              Menu Navigasi Profil
            </h2>
            <div className="flex flex-col space-y-1 relative">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-between transition-colors duration-200 relative z-10 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 hover:text-[#005BAC]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarTab"
                        className="absolute inset-0 bg-[#005BAC] rounded-xl shadow-md -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <span>{item.label}</span>
                    
                    <ChevronRight 
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            
            {/* Vision & Mission */}
            {activeTab === 'vision' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Visi & Misi UPPD Purwokerto
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Landasan kerja operasional dalam melayani masyarakat Kabupaten Banyumas.
                  </p>
                </div>

                {/* Visi */}
                <div className="mb-10 mt-6">
                  <div className="relative bg-gradient-to-br from-[#005BAC] to-blue-800 rounded-3xl p-8 sm:p-10 text-center shadow-lg overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
                      <Target className="w-56 h-56" />
                    </div>
                    
                    <p className="text-sm sm:text-base text-blue-200 font-medium mb-3">
                      Visi Pembangunan Jawa Tengah 2018-2023
                    </p>
                    
                    <h3 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-5 tracking-tight">
                      “Menuju Jawa Tengah Sejahtera<br className="hidden sm:block"/> dan Berdikari”
                    </h3>
                    
                    <div className="relative z-10 inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2.5 shadow-sm">
                      <p className="text-sm sm:text-base font-bold italic text-cyan-200 tracking-wide">
                        Tetep Mboten Korupsi, Mboten Ngapusi
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Visi pembangunan daerah Jawa Tengah tahun 2018-2023 merupakan keberlanjutan dari cita-cita pembangunan Jawa Tengah tahun 2013-2018. Makna yang terkandung dalam visi sebagai berikut:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <HeartHandshake className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3">Sejahtera</h4>
                      <p className="text-[13px] text-slate-600 leading-relaxed text-justify">
                        Masyarakat Jawa Tengah Sejahtera adalah masyarakat yang tercukupi segala kebutuhan dasarnya secara adil dan merata berprinsip pada peri kemanusiaan dan peri keadilan. Masyarakat sejahtera juga terbebas dari ketidakmerdekaan, kebodohan, kesakitan, kelaparan, serta ancaman dari perlakuan atau tindak kekerasan fisik maupun non fisik. Dalam lingkungan masyarakat yang sejahtera akan tercipta hubungan sosial yang nyaman dan aman, tanpa adanya diskriminasi SARA, serta tercipta relasi yang dinamis, saling menghargai, saling pengertian, dan toleransi yang tinggi. Ketercukupan kebutuhan masyarakat didukung pemenuhan prasarana dasar, pelayanan publik, dan teknologi secara menerus.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3">Berdikari</h4>
                      <p className="text-[13px] text-slate-600 leading-relaxed text-justify">
                        Berdikari merupakan sebuah tujuan agar masyarakat mampu memenuhi segala kebutuhan dasarnya secara mandiri dan cukup. Dengan begitu, berdikari menjadi sebuah metode untuk mewujudkan kesejahteraan masyarakat dan lingkungan hidupnya berbasis modal pokok milik sendiri, baik sumberdaya alam, manusia, sosial, budaya, ekonomi, dan politik. Sedangkan sumberdaya yang berasal dari luar merupakan tambahan apabila diperlukan.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 text-sm text-slate-700 leading-relaxed">
                    Perwujudan masyarakat Jawa Tengah yang sejahtera dan berdikari dilandasi semangat dan nilai utama <strong className="font-bold text-[#005BAC] italic">Mboten Korupsi, Mboten Ngapusi</strong>. Nilai ini dimanifestasi dalam sikap, tindakan, dan laku seluruh masyarakat Jawa Tengah untuk dapat bersama mencapai kesejahteraan yang berdikari.
                  </div>
                </div>

                {/* Misi */}
                <div className="mb-10">
                  <div className="mb-5">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Misi Pembangunan
                    </h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Dalam rangka upaya menuju pencapaian visi pembangunan daerah Jawa Tengah tahun 2018-2023, ditetapkan misi pembangunan daerah yaitu:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#005BAC] hover:shadow-md transition-all flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#005BAC] flex items-center justify-center font-black text-base group-hover:bg-[#005BAC] group-hover:text-white transition-colors shrink-0">
                        1
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">
                        Membangun masyarakat Jawa Tengah yang religius, toleran dan guyub untuk menjaga Negara Kesatuan Republik Indonesia
                      </p>
                    </div>

                    <div className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#005BAC] hover:shadow-md transition-all flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#005BAC] flex items-center justify-center font-black text-base group-hover:bg-[#005BAC] group-hover:text-white transition-colors shrink-0">
                        2
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">
                        Mempercepat reformasi birokrasi yang dinamis serta memperluas sasaran ke pemerintahan Kabupaten/Kota
                      </p>
                    </div>

                    <div className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#005BAC] hover:shadow-md transition-all flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#005BAC] flex items-center justify-center font-black text-base group-hover:bg-[#005BAC] group-hover:text-white transition-colors shrink-0">
                        3
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">
                        Memperkuat kapasitas ekonomi rakyat dan membuka lapangan kerja baru untuk mengurangi kemiskinan dan pengangguran
                      </p>
                    </div>

                    <div className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#005BAC] hover:shadow-md transition-all flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#005BAC] flex items-center justify-center font-black text-base group-hover:bg-[#005BAC] group-hover:text-white transition-colors shrink-0">
                        4
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">
                        Menjadikan rakyat Jawa Tengah lebih sehat, lebih pintar, lebih berbudaya dan mencintai lingkungan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program Unggulan */}
                <div className="border-t border-slate-200 pt-6 mb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Program Unggulan
                  </h3>

                  <p className="text-base font-normal text-slate-700 leading-relaxed mb-5">
                    Program unggulan Gubernur dan Wakil Gubernur Jawa Tengah tahun
                    2018-2019 harus diimplementasikan yaitu:
                  </p>

                  <div className="space-y-4">
                    {[
                      'Sekolah tanpa sekat; pelatihan tentang demokrasi dan pemilu, gender, anti korupsi dan magang gubernur untuk siswa SMA/SMK;',
                      'Peningkatan peran rumah ibadah, fasilitasi pendakwah dan guru ngaji;',
                      'Reformasi birokrasi di kabupaten/kota yang dinamis berbasis teknologi informasi dan sistem layanan terintegrasi;',
                      'Satgas kemiskinan, bantuan desa, rumah sederhana layak huni;',
                      'Obligasi daerah, kemudahan akses kredit UMKM, penguatan BUMDes dan pelatihan startup untuk Wirausaha Muda;',
                      'Menjaga harga komoditas dan asuransi gagal panen untuk petani serta melindungi kepentingan nelayan;',
                      'Pengembangan transportasi massal, revitaliasi jalur kereta dan bandara serta pembangunan embung/irigasi;',
                      'Pembukaan kawasan industri baru dan rintisan pertanian terintegrasi; Afirmasi kebijakan tumbuhnya kawasan industri baru di perbatasan barat dan selatan, dalam mempercepat proses persebaran pusat-pusat pertumbuhan ekonomi.',
                      'Rumah sakit tanpa dinding, sekolah biaya pemerintah khusus untuk siswa miskin (SMAN, SMKN, SLB) dan bantuan sekolah swasta, ponpes, madrasah dan difabel;',
                      'Festival seni serta pengembangan infrastruktur olahraga, rumah kebudayaan dan kepedulian lingkungan.'
                    ].map((program, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#005BAC] text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {i + 1}
                        </div>

                        <p className="text-sm text-slate-700 leading-relaxed pt-1">
                          {program}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tujuan & Sasaran Operasional */}
                <div className="border-t border-slate-200 pt-8 mt-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Tujuan Dan Sasaran Operasional
                    </h3>
                  </div>

                  <p className="text-sm font-normal text-slate-600 leading-relaxed mb-8 bg-slate-50 p-5 rounded-xl border border-slate-100">
                    Agar visi dan misi pembangunan daerah Jawa Tengah tahun 2018-2023 lebih terarah dalam implementasinya, misi tersebut dijabarkan secara operasional ke dalam <strong className="text-[#005BAC]">6 Tujuan</strong> dan <strong className="text-[#005BAC]">10 Sasaran</strong> beserta indikator kinerjanya sebagai berikut:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#005BAC] transition-all p-5 flex flex-col h-full">
                      <div className="flex gap-3 mb-4 border-b border-slate-100 pb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#005BAC] flex items-center justify-center font-bold shrink-0 group-hover:bg-[#005BAC] group-hover:text-white transition-colors">1</div>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug">
                          Masyarakat religius, toleran dan guyub
                        </h4>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-600 flex-grow">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Tujuan:</span> Membangun masyarakat yang semakin religius, toleran, dan guyub.</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Sasaran:</span> Terciptanya kohesi sosial masyarakat secara utuh.</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Indikator:</span> Indeks toleransi terjaga & persentase tindak pidana SARA tertangani.</p>
                        </li>
                      </ul>
                    </div>

                    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#005BAC] transition-all p-5 flex flex-col h-full">
                      <div className="flex gap-3 mb-4 border-b border-slate-100 pb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#005BAC] flex items-center justify-center font-bold shrink-0 group-hover:bg-[#005BAC] group-hover:text-white transition-colors">2</div>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug">
                          Reformasi birokrasi yang dinamis
                        </h4>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-600 flex-grow">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Tujuan:</span> Mewujudkan tata kelola pemerintahan yang baik & bersih (Good Governance).</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Sasaran:</span> Meningkatnya kualitas pelayanan publik, efektivitas manajemen, dan profesionalitas ASN.</p>
                        </li>
                      </ul>
                    </div>

                    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#005BAC] transition-all p-5 flex flex-col h-full">
                      <div className="flex gap-3 mb-4 border-b border-slate-100 pb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#005BAC] flex items-center justify-center font-bold shrink-0 group-hover:bg-[#005BAC] group-hover:text-white transition-colors">3</div>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug">
                          Kapasitas ekonomi & lapangan kerja
                        </h4>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-600 flex-grow">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Tujuan:</span> Menurunkan kemiskinan merata & stabilitas ekonomi daerah yang inklusif.</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Sasaran:</span> Kualitas hidup penduduk miskin naik, pengangguran terbuka turun, sektor unggulan & investasi tumbuh.</p>
                        </li>
                      </ul>
                    </div>

                    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#005BAC] transition-all p-5 flex flex-col h-full">
                      <div className="flex gap-3 mb-4 border-b border-slate-100 pb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#005BAC] flex items-center justify-center font-bold shrink-0 group-hover:bg-[#005BAC] group-hover:text-white transition-colors">4</div>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug">
                          Kualitas SDM & kelestarian lingkungan
                        </h4>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-600 flex-grow">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Tujuan:</span> Membangun SDM berkualitas (IPM) & SDA yang lestari (IKLH).</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p><span className="font-bold text-slate-800">Sasaran:</span> Meningkatnya derajat kesehatan, tingkat pendidikan masyarakat, serta kualitas air, udara & tutupan hutan.</p>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Gambar Pendukung Visi Misi */}
                <div className="mt-8">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                    <img
                      src="/images/visi-misi.jpg"
                      alt="Gambar Pendukung UPPD Banyumas"
                      className="w-full max-w-4xl mx-auto rounded-xl object-contain"
                    />
                  </div>
                </div>

              </motion.div>
            )}

            {/* ================= TAB: WILAYAH KERJA & PENDAPATAN ================= */}
            {activeTab === 'territory' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 w-full"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Wilayah Kerja & Jenis Pendapatan
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Informasi lengkap cakupan wilayah operasional dan rincian jenis pendapatan yang dikelola oleh UPPD Purwokerto.
                  </p>
                </div>

                {/* Bagian: Jenis Pendapatan yang Dikelola */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 w-full">
                  <div className="mb-5">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Jenis Pendapatan yang Dikelola UPPD Purwokerto
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Rincian komponen pajak dan retribusi daerah yang dikelola.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* 1. Pajak Kendaraan Bermotor (PKB) */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-[#005BAC] transition-all group flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-[#005BAC] text-white flex items-center justify-center text-xs font-bold shrink-0">01</div>
                          <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#005BAC] transition-colors">
                            Pajak Kendaraan Bermotor (PKB)
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify mb-3">
                          Pajak atas kepemilikan dan/atau penguasaan kendaraan bermotor yang terdaftar di wilayah kerja UPPD Purwokerto.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 font-medium border-t border-slate-200/60 pt-3">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Pendaftaran kendaraan baru & perpanjangan STNK tahunan</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Pengesahan ulang / ganti plat nomor 5 tahunan</span>
                        </li>
                      </ul>
                    </div>

                    {/* 2. Bea Balik Nama (BBN) Kendaraan Bermotor */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-[#005BAC] transition-all group flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-[#005BAC] text-white flex items-center justify-center text-xs font-bold shrink-0">02</div>
                          <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#005BAC] transition-colors">
                            Bea Balik Nama (BBN) Kendaraan Bermotor
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify mb-3">
                          Pajak atas penyerahan hak milik kendaraan bermotor sebagai akibat perjanjian penyerahan atau perbuatan hukum lainnya.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 font-medium border-t border-slate-200/60 pt-3">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Balik nama kepemilikan kendaraan bekas (BBN II)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Mutasi masuk kendaraan dari luar daerah</span>
                        </li>
                      </ul>
                    </div>

                    {/* 3. Pajak Air Permukaan */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-[#005BAC] transition-all group flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-[#005BAC] text-white flex items-center justify-center text-xs font-bold shrink-0">03</div>
                          <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#005BAC] transition-colors">
                            Pajak Air Permukaan
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify mb-3">
                          Pajak atas pengambilan dan/atau pemanfaatan air permukaan untuk berbagai keperluan di wilayah daerah.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 font-medium border-t border-slate-200/60 pt-3">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Pengelolaan dan pendataan pemanfaatan air permukaan</span>
                        </li>
                      </ul>
                    </div>

                    {/* 4. Pelayanan Retribusi, Pendapatan Lain & Pemanfaatan Aset (PRPLPAD) */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-[#005BAC] transition-all group flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-[#005BAC] text-white flex items-center justify-center text-xs font-bold shrink-0">04</div>
                          <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#005BAC] transition-colors">
                            Pelayanan Retribusi, Pendapatan Lain dan Pemanfaatan Aset Daerah (PRPLPAD)
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify mb-3">
                          Pendapatan asli daerah sah lainnya yang bersumber dari pemanfaatan fasilitas daerah, pelayanan administrasi khusus, dan pengelolaan aset di lingkungan UPPD.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 font-medium border-t border-slate-200/60 pt-3">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Pelayanan administrasi dokumen dan optimalisasi kerja sama pemanfaatan aset daerah</span>
                        </li>
                      </ul>
                    </div>

                    {/* 5. Pajak Alat Berat */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-[#005BAC] transition-all group flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-[#005BAC] text-white flex items-center justify-center text-xs font-bold shrink-0">05</div>
                          <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#005BAC] transition-colors">
                            Pajak Alat Berat
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed text-justify mb-3">
                          Pajak atas kepemilikan dan/atau penguasaan alat berat yang beroperasi di wilayah kerja daerah.
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 font-medium border-t border-slate-200/60 pt-3">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Pendataan dan pengawasan unit alat berat</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Bagian: Peta Wilayah Kerja */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 w-full">
                  <div className="mb-4">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Wilayah Kerja UPPD Purwokerto
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Cakupan administratif wilayah pelayanan operasional.</p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => setSelectedPerson({ role: 'Grafik Kinerja', name: 'Wilayah Kerja UPPD Purwokerto', image: '/images/wilayah_kerja.jpeg' })}
                    className="cursor-pointer group relative overflow-hidden rounded-xl bg-slate-50 p-3 border border-slate-100 w-full flex justify-center"
                  >
                    <img
                      src="/images/wilayah_kerja.jpeg"
                      alt="Wilayah Kerja UPPD Purwokerto"
                      className="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-sm"
                    />
                  </motion.div>
                </div>

              </motion.div>
            )}

            {/* History Sejarah SAMSAT */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Sejarah SAMSAT Kabupaten Banyumas
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Lintas perjalanan kelembagaan Unit Pelayanan Pendapatan Daerah (UPPD) Kabupaten Banyumas.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 max-w-md mx-auto">
                  <img
                    src="/images/gedung.jpeg"
                    alt="Gedung Kantor UPPD / SAMSAT Kabupaten Banyumas"
                    className="w-full h-80 sm:h-96 object-cover rounded-xl"
                  />
                  <p className="text-center text-xs text-slate-500 mt-2.5 font-semibold tracking-wide uppercase">
                    UPPD Kabupaten Banyumas
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                  <div className="relative group">
                    <span className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#005BAC] text-white flex items-center justify-center ring-4 ring-white shadow-sm font-bold text-xs">✓</span>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="inline-block bg-blue-100 text-[#005BAC] text-xs font-bold px-3 py-1 rounded-full mb-2">5 Juli 1967</span>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">Cikal Bakal DIPENDA</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Cikal bakal Dinas Pendapatan Daerah (DIPENDA) Provinsi Jawa Tengah dibentuk berdasarkan Keputusan Gubernur Jawa Tengah.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <span className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#005BAC] text-white flex items-center justify-center ring-4 ring-white shadow-sm font-bold text-xs">✓</span>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="inline-block bg-blue-100 text-[#005BAC] text-xs font-bold px-3 py-1 rounded-full mb-2">11 Oktober 1968</span>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">Pembentukan Resmi Kelembagaan</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Secara kelembagaan resmi dibentuk melalui Surat Keputusan Gubernur Kepala Daerah Tingkat I Jawa Tengah Nomor Huk.G.23/2/18 tentang Pembentukan Dinas Pendapatan Daerah Provinsi Daerah Tingkat I Jawa Tengah.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <span className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#005BAC] text-white flex items-center justify-center ring-4 ring-white shadow-sm font-bold text-xs">✓</span>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="inline-block bg-blue-100 text-[#005BAC] text-xs font-bold px-3 py-1 rounded-full mb-2">Tahun 2008</span>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">Perubahan ke DPPAD</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Nomenklatur kelembagaan berubah dari DIPENDA menjadi Dinas Pendapatan dan Pengelolaan Aset Daerah (DPPAD) berdasarkan Peraturan Daerah Provinsi Jawa Tengah Nomor 6 Tahun 2008 tentang Organisasi dan Tata Kerja Dinas Daerah Provinsi Jawa Tengah.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <span className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#005BAC] text-white flex items-center justify-center ring-4 ring-white shadow-sm font-bold text-xs">✓</span>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="inline-block bg-blue-100 text-[#005BAC] text-xs font-bold px-3 py-1 rounded-full mb-2">Tahun 2016</span>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">Perubahan ke BPPD & Penguatan UPPD</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Nomenklatur DPPAD berubah menjadi Badan Pengelola Pendapatan Daerah (BPPD) berdasarkan Peraturan Daerah Provinsi Jawa Tengah Nomor 9 Tahun 2016 serta Peraturan Gubernur Jawa Tengah Nomor 81 Tahun 2016 tentang Organisasi dan Tata Kerja Badan Pengelola Pendapatan Daerah Provinsi Jawa Tengah. Peraturan inilah yang juga memperkokoh fungsi operasional Unit Pelayanan Pendapatan Daerah (UPPD).
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <span className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white shadow-sm font-bold text-xs">★</span>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">22 Agustus 2019 - Sekarang</span>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">Nomenklatur BAPENDA</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Nomenklatur berubah kembali menjadi Badan Pengelola Pendapatan Daerah (BAPENDA) berdasarkan Keputusan Gubernur Jawa Tengah Nomor 061/44 Tahun 2019, dan nama ini digunakan hingga saat ini.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 bg-blue-50/60 border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#005BAC] text-white p-2.5 rounded-xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Dasar Pelaksanaan UPPD SAMSAT Banyumas
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">
                    Pelaksanaan operasional SAMSAT Kabupaten Banyumas juga berpedoman pada:
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#005BAC] shrink-0 mt-0.5" />
                      <span>Undang-Undang Republik Indonesia Nomor 28 Tahun 2009 tentang Pajak Daerah dan Retribusi Daerah.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#005BAC] shrink-0 mt-0.5" />
                      <span>Peraturan Gubernur Jawa Tengah Nomor 25 Tahun 2018 tentang Organisasi dan Tata Kerja Unit Pelaksana Teknis Badan Pengelola Pendapatan Daerah Provinsi Jawa Tengah.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Organizational Structure */}
            {activeTab === 'structure' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Struktur Organisasi
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Bagan Tata Kerja UPPD SAMSAT Kabupaten Banyumas. (Klik kartu untuk memperbesar)
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="flex flex-col items-center">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedPerson({ role: 'Kepala UPPD Purwokerto', name: 'ERRY RAHARJONO, S.SOS, MSI.', image: '/images/kepala-uppd.jpeg' })}
                      className="w-full max-w-sm bg-[#005BAC] text-white rounded-xl shadow-md p-4 text-center cursor-pointer relative group"
                    >
                      <div className="absolute top-2 right-3 text-amber-300"><Crown className="w-5 h-5 fill-amber-300" /></div>
                      <img
                        src="/images/kepala-uppd.jpeg"
                        alt="Kepala UPPD Purwokerto"
                        className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border-4 border-white"
                      />
                      <p className="text-xs font-bold text-sky-200 uppercase">
                        KEPALA UPPD PURWOKERTO
                      </p>
                      <p className="font-black text-base mt-1">
                        ERRY RAHARJONO, S.SOS, MSI.
                      </p>
                      <p className="text-xs text-white mt-1 font-medium tracking-wide">
                        NIP. 19690905 198803 1 00 1
                      </p>
                    </motion.div>

                    <div className="flex justify-center">
                      <div className="w-0.5 h-8 bg-slate-400"></div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedPerson({ role: 'Kepala Subbag Tata Usaha', name: 'NOVY SETIAWAN, SH.', image: '/images/kepala-kasubag.jpeg' })}
                      className="w-full max-w-sm bg-white rounded-xl border border-slate-300 shadow-sm p-5 text-center cursor-pointer hover:border-[#005BAC] transition-all"
                    >
                      <img
                        src="/images/kepala-kasubag.jpeg"
                        alt="Kepala Subbag Tata Usaha"
                        className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border-4 border-blue-100"
                      />
                      <p className="text-[11px] font-bold text-[#005BAC] uppercase leading-tight">
                        KEPALA SUBBAG
                        <br />
                        TATA USAHA
                      </p>
                      <p className="font-bold text-sm text-slate-800 mt-2">
                        NOVY SETIAWAN, SH.
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">
                        NIP. 19851126 201101 1 006
                      </p>
                    </motion.div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-slate-400"></div>
                  </div>

                  <div className="relative max-w-3xl mx-auto">
                    <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-0.5 bg-slate-400"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative pt-6">
                        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-400"></div>
                        <motion.div 
                          whileHover={{ scale: 1.03 }}
                          onClick={() => setSelectedPerson({ role: 'Seksi PPD', name: 'RIZA UYUN INDRIYANI, SE, M.AKUN.', image: '/images/kepala-ppd.jpeg' })}
                          className="bg-white rounded-xl border border-slate-300 shadow-sm p-5 text-center cursor-pointer hover:border-[#005BAC] transition-all"
                        >
                          <img
                            src="/images/kepala-ppd.jpeg"
                            alt="Kepala Seksi Pelayanan Pajak Daerah"
                            className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border-4 border-blue-100"
                          />
                          <p className="text-[11px] font-bold text-[#005BAC] uppercase leading-tight">
                            KEPALA SEKSI PELAYANAN
                            <br />
                            PAJAK DAERAH (PPD)
                          </p>
                          <p className="font-bold text-sm text-slate-800 mt-2">
                            RIZA UYUN INDRIYANI, SE, M.AKUN.
                          </p>
                          <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">
                            NIP. 198811192011012011
                          </p>
                        </motion.div>
                      </div>

                      <div className="relative pt-6">
                        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-400"></div>
                        <motion.div 
                          whileHover={{ scale: 1.03 }}
                          onClick={() => setSelectedPerson({ role: 'Seksi PRPL & PAD', name: 'FAJAR POEROESAKTI, SH, MH.', image: '/images/kepala-prpl.jpeg' })}
                          className="bg-white rounded-xl border border-slate-300 shadow-sm p-5 text-center cursor-pointer hover:border-[#005BAC] transition-all"
                        >
                          <img
                            src="/images/kepala-prpl.jpeg"
                            alt="Kepala Seksi Pelayanan Retribusi"
                            className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border-4 border-blue-100"
                          />
                          <p className="text-[11px] font-bold text-[#005BAC] uppercase leading-tight">
                            KEPALA SEKSI PELAYANAN
                            <br />
                            RETRIBUSI, PENDAPATAN LAIN
                            <br />
                            DAN PEMANFAATAN ASET DAERAH
                            <br />
                            (PRPL & PAD)
                          </p>
                          <p className="font-bold text-sm text-slate-800 mt-2">
                            FAJAR POEROESAKTI, SH, MH.
                          </p>
                          <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">
                            NIP. 19730124 200801 1 001
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= KEKUATAN PERSONIL DENGAN ANIMASI DINAMIS ================= */}
                <div className="mt-10">
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center mb-6"
                  >
                    <div className="bg-gradient-to-r from-blue-900 via-[#005BAC] to-blue-800 text-white px-8 py-3 rounded-2xl shadow-lg flex items-center gap-3 border border-blue-400/30">
                      <Users className="w-6 h-6 animate-pulse text-amber-300" />
                      <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-wide">
                        Kekuatan Personil
                      </h3>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center mb-8"
                  >
                    <p className="text-base md:text-lg text-slate-700 bg-blue-50/80 inline-block px-6 py-2 rounded-full border border-blue-100 shadow-sm">
                      Jumlah Pegawai{" "}
                      <span className="font-black text-[#005BAC] text-xl ml-1">
                        20 Orang
                      </span>
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    
                    {/* Kartu 1: ASN & PPPK FULLTIME */}
                    <motion.div 
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="bg-white rounded-3xl border border-blue-200/80 shadow-lg overflow-hidden relative group"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                      <div className="bg-gradient-to-b from-[#005BAC] to-blue-800 text-white p-5 text-center relative overflow-hidden">
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                        <p className="font-extrabold text-sm md:text-base uppercase tracking-wider text-blue-100">
                          ASN & PPPK FULLTIME
                        </p>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="inline-block mt-3 bg-white text-[#005BAC] px-6 py-2 rounded-full font-black text-sm shadow-md"
                        >
                          14 ORANG
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50/50">
                        {/* Laki-laki */}
                        <motion.div 
                          whileHover={{ scale: 1.03, backgroundColor: '#f0f7ff' }}
                          className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-sm transition-colors"
                        >
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                            <Users className="w-6 h-6 text-[#005BAC]" />
                          </div>
                          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Laki-laki</p>
                          <p className="text-lg font-black text-slate-900 mt-1">10 Orang</p>
                        </motion.div>

                        {/* Perempuan */}
                        <motion.div 
                          whileHover={{ scale: 1.03, backgroundColor: '#fdf2f8' }}
                          className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-sm transition-colors"
                        >
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 flex items-center justify-center shadow-inner">
                            <Users className="w-6 h-6 text-pink-500" />
                          </div>
                          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Perempuan</p>
                          <p className="text-lg font-black text-slate-900 mt-1">4 Orang</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Kartu 2: PPPK PW */}
                    <motion.div 
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="bg-white rounded-3xl border border-blue-200/80 shadow-lg overflow-hidden relative group"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-sky-600" />
                      <div className="bg-gradient-to-b from-[#005BAC] to-blue-800 text-white p-5 text-center relative overflow-hidden">
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                        <p className="font-extrabold text-sm md:text-base uppercase tracking-wider text-blue-100">
                          PPPK PW
                        </p>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="inline-block mt-3 bg-white text-[#005BAC] px-6 py-2 rounded-full font-black text-sm shadow-md"
                        >
                          6 ORANG
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50/50">
                        {/* Laki-laki */}
                        <motion.div 
                          whileHover={{ scale: 1.03, backgroundColor: '#f0f7ff' }}
                          className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-sm transition-colors"
                        >
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                            <Users className="w-6 h-6 text-[#005BAC]" />
                          </div>
                          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Laki-laki</p>
                          <p className="text-lg font-black text-slate-900 mt-1">4 Orang</p>
                        </motion.div>

                        {/* Perempuan */}
                        <motion.div 
                          whileHover={{ scale: 1.03, backgroundColor: '#fdf2f8' }}
                          className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-sm transition-colors"
                        >
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 flex items-center justify-center shadow-inner">
                            <Users className="w-6 h-6 text-pink-500" />
                          </div>
                          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Perempuan</p>
                          <p className="text-lg font-black text-slate-900 mt-1">2 Orang</p>
                        </motion.div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* Organizer Profile */}
            {activeTab === 'organizer' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Profil Penyelenggara
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    KEBIJAKAN MUTU & MAKLUMAT PELAYANAN UNIT PELAYANAN PENDAPATAN DAERAH (UPPD) KABUPATEN BANYUMAS
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-6 bg-blue-50/60 rounded-2xl border border-blue-200/80 shadow-sm text-center flex flex-col justify-center min-h-[220px]">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#005BAC] leading-relaxed">
                      BADAN PENGELOLA PENDAPATAN DAERAH JAWA TENGAH
                    </h3>
                    <h3 className="text-base font-extrabold text-[#005BAC] uppercase tracking-wide mb-3 mt-1">
                      KEBIJAKAN MUTU
                    </h3>
                    <p className="text-sm font-bold text-slate-800 leading-relaxed">
                      UNIT PELAYANAN PENDAPATAN DAERAH (UPPD)
                    </p>
                    <p className="text-sm text-slate-700 font-extrabold mt-2">
                      BERKOMITMEN
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                      Mewujudkan Pelayanan Prima Dengan Cara Melakukan Perbaikan Pengelolaan Pendapatan Daerah Secara Berkesinambungan
                    </p>
                  </div>

                  <div className="p-6 bg-blue-50/60 rounded-2xl border border-blue-200/80 shadow-sm text-center flex flex-col justify-center min-h-[220px]">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#005BAC] leading-relaxed">
                      MAKLUMAT PELAYANAN
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed italic font-medium px-2">
                      "DENGAN INI KAMI MENYATAKAN SANGGUP MELAKSANAKAN PELAYANAN SESUAI DENGAN STANDAR PELAYANAN YANG DITETAPKAN DAN APABILA TIDAK MENEPATI KAMI BERSEDIA MENERIMA SANKSI DAN/ATAU MEMBERIKAN KOMPENSASI SESUAI DENGAN PERATURAN PERUNDANG-UNDANGAN"
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider text-center mb-6 pb-2 border-b border-slate-100">
                    Pejabat Penanggung Jawab Pelayanan SAMSAT
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase leading-snug">
                          Dirlantas Kepolisian Daerah<br />Jawa Tengah
                        </p>
                      </div>
                      <div className="my-4 py-2">
                        <span className="font-serif italic text-slate-400 text-sm select-none"></span>
                      </div>
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">AGUS SURYO NUGROHO</p>
                        <p className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Komisaris Besar Polisi</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase leading-snug">
                          Plt. Kepala Badan Pengelola Pendapatan Daerah<br />Provinsi Jawa Tengah
                        </p>
                      </div>
                      <div className="my-4 py-2">
                        <span className="font-serif italic text-slate-400 text-sm select-none"></span>
                      </div>
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">EDDY S. BRAMIYANTO</p>
                        <p className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Pembina Utama Muda</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase leading-snug">
                          PT. Jasa Raharja<br />Cabang Utama Jawa Tengah
                        </p>
                      </div>
                      <div className="my-4 py-2">
                        <span className="font-serif italic text-slate-400 text-sm select-none"></span>
                      </div>
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">SIGIT HARISMUN</p>
                        <p className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Kepala Cabang</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Implementer Profile */}
            {activeTab === 'implementer' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Penilaian Kinerja
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Target dan realisasi penerimaan daerah UPPD Kabupaten Banyumas. (Klik gambar tabel untuk memperbesar)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                  {[
                    { id: 'apbd', label: 'Target Realisasi APBD', icon: Target },
                    { id: 'pad', label: 'Target Penerimaan PAD', icon: Award },
                  ].map((tab) => {
                    const isActive = performanceTab === tab.id;
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setPerformanceTab(tab.id as 'apbd' | 'pad')}
                        className={`p-5 rounded-2xl border text-left transition-colors duration-200 relative overflow-hidden z-10 ${
                          isActive
                            ? 'text-white border-[#005BAC] shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-[#005BAC]'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activePerformanceTab"
                            className="absolute inset-0 bg-[#005BAC] rounded-2xl -z-10"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                        <div className="flex items-center gap-3 relative z-10">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                              isActive ? 'bg-white/20' : 'bg-blue-100'
                            }`}
                          >
                            <IconComponent
                              className={`w-6 h-6 ${isActive ? 'text-white' : 'text-[#005BAC]'}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-base">{tab.label}</h3>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                  {performanceTab === 'apbd' && (
                    <motion.div
                      key="apbd"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3 className="text-xl font-extrabold text-[#005BAC] mb-3">
                        Target Realisasi APBD
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Informasi mengenai target dan realisasi Anggaran Pendapatan dan Belanja Daerah (APBD) UPPD Kabupaten Banyumas.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                        {[
                          { src: '/images/target1.png', alt: 'Target Realisasi APBD 1' },
                          { src: '/images/target2.png', alt: 'Target Realisasi APBD 2' },
                          { src: '/images/target3.png', alt: 'Target Realisasi APBD 3' },
                          { src: '/images/target4.png', alt: 'Target Realisasi APBD 4' },
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedPerson({ role: 'Grafik Kinerja', name: item.alt, image: item.src })}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 cursor-pointer group relative overflow-hidden"
                          >
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="w-full h-64 object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors rounded-2xl flex items-end justify-center pb-4">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                                Klik untuk Memperbesar Tabel
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {performanceTab === 'pad' && (
                    <motion.div
                      key="pad"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3 className="text-xl font-extrabold text-[#005BAC] mb-3">
                        Target Penerimaan PAD
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Informasi mengenai target penerimaan Pendapatan Asli Daerah (PAD).
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Charter / Maklumat Pelayanan */}
            {activeTab === 'charter' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Maklumat Pelayanan
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Dokumen resmi Maklumat Pelayanan SAMSAT Kabupaten Banyumas.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-blue-50 text-[#005BAC] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <ScrollText className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-800 mb-1">
                    Dokumen Belum Tersedia
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                    Berkas gambar Maklumat Pelayanan saat ini belum diunggah atau sedang dalam tahap pembaruan data.
                  </p>
                </div>
              </motion.div>
            )}

            {/* SOP (Standar Operasional Prosedur) */}
            {activeTab === 'sop' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Standar Operasional Prosedur (SOP)
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Dokumen dan alur Standar Operasional Prosedur pelayanan SAMSAT Kabupaten Banyumas. (Klik gambar untuk memperbesar)
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { src: '/images/sop1.jpg', alt: 'Standar Operasional Prosedur 1' },
                      { src: '/images/sop2.jpg', alt: 'Standar Operasional Prosedur 2' },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPerson({ role: 'Grafik Kinerja', name: item.alt, image: item.src })}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 cursor-pointer group relative overflow-hidden"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-64 object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors rounded-2xl flex items-end justify-center pb-4">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                            Klik untuk Memperbesar Dokumen
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SIPP Pelayanan Publik */}
            {activeTab === 'sipp' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    SIPP Pelayanan Publik
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Sistem Informasi Pelayanan Publik (SIPP) UPPD Kabupaten Banyumas. (Klik gambar untuk memperbesar)
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { src: '/images/sipp1.jpg', alt: 'SIPP Pelayanan Publik 1' },
                      { src: '/images/sipp2.jpg', alt: 'SIPP Pelayanan Publik 2' },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPerson({ role: 'Grafik Kinerja', name: item.alt, image: item.src })}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 cursor-pointer group relative overflow-hidden"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-64 object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors rounded-2xl flex items-end justify-center pb-4">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                            Klik untuk Memperbesar Dokumen
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};