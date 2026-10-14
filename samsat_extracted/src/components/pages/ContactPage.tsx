import React, { useState, useEffect } from 'react';
import { useSamsat } from '../../context/SamsatContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Headphones,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addContactMessage } = useSamsat();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  // Cek apakah kantor sedang buka berdasarkan hari dan jam saat ini
  useEffect(() => {
    const checkOfficeHours = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Minggu, 1 = Senin, dst.
      const hour = now.getHours() + now.getMinutes() / 60;

      // Senin - Kamis: 08.00 - 13.00, Jumat: 08.00 - 11.00, Sabtu: 08.00 - 12.00
      if (day >= 1 && day <= 4) {
        setIsOfficeOpen(hour >= 8 && hour < 13);
      } else if (day === 5) {
        setIsOfficeOpen(hour >= 8 && hour < 11);
      } else if (day === 6) {
        setIsOfficeOpen(hour >= 8 && hour < 12);
      } else {
        setIsOfficeOpen(false); // Minggu tutup
      }
    };

    checkOfficeHours();
    const interval = setInterval(checkOfficeHours, 60000); // Cek tiap menit
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    addContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    });

    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="pt-28 pb-16 bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Background Glow Ornaments */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-r from-blue-400/10 to-indigo-400/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#005BAC] text-xs font-extrabold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Layanan Pengaduan & Informasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Hubungi SAMSAT Purwokerto
          </h1>
          <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
            Kami siap mendengarkan aspirasi, menjawab pertanyaan, dan membantu kendala layanan perpajakan kendaraan Anda secara transparan.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Contacts, Status, & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card Informasi Kontak */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 relative z-10">
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Pusat Informasi & Kontak
                  </h2>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">UPPD Kabupaten Banyumas</p>
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5 ${
                  isOfficeOpen ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-rose-100 text-rose-700 border border-rose-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isOfficeOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  {isOfficeOpen ? 'Kantor Buka' : 'Kantor Tutup'}
                </span>
              </div>

              <ul className="space-y-5 text-sm text-slate-600 relative z-10">
                <li className="flex items-start gap-3.5 group/item">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#005BAC] flex items-center justify-center shrink-0 group-hover/item:bg-[#005BAC] group-hover/item:text-white transition-all shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">Alamat Kantor Induk</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Jl. Prof. M. Yamin No.7, Karangklesem, Karangpucung, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53142
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 group/item">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">Call Center & WhatsApp</p>
                    <p className="text-xs text-slate-600 mt-0.5">Telepon: (0281) 637801</p>
                    <div className="flex items-center justify-between mt-2 bg-emerald-50/60 border border-emerald-100 px-3 py-2 rounded-xl">
                      <div>
                        <p className="text-[10px] font-bold text-emerald-700 uppercase">Layanan WhatsApp</p>
                        <p className="text-xs font-black text-emerald-800">0851-12680759</p>
                      </div>
                      <a
                        href="https://wa.me/6285112680759"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all shadow-md shadow-emerald-600/20"
                      >
                        <span>Chat WA</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 group/item">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#005BAC] flex items-center justify-center shrink-0 group-hover/item:bg-[#005BAC] group-hover/item:text-white transition-all shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">Email Resmi</p>
                    <p className="text-xs text-slate-600 mt-1">Up3adbms@gmail.com</p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 group/item">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#005BAC] flex items-center justify-center shrink-0 group-hover/item:bg-[#005BAC] group-hover/item:text-white transition-all shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">Jam Operasional Kantor</p>
                    <p className="text-xs text-slate-600 mt-1">Senin - Kamis: 08.00 - 13.00 WIB</p>
                    <p className="text-xs text-slate-600">Jumat: 08.00 - 11.00 WIB | Sabtu: 08.00 - 12.00 WIB</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Maps Embed Preview */}
            <div className="bg-white p-2.5 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100 overflow-hidden h-72 relative">
              <iframe
                title="Peta SAMSAT Purwokerto"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63299.38060169357!2d109.20501587910154!3d-7.441859599999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655c2b92579f25%3A0x42cc86a8369ade7a!2sSamsat%20Purwokerto!5e0!3m2!1sen!2sus!4v1787848499967!5m2!1sen!2sus"
                className="w-full h-full rounded-2xl border-0 shadow-inner"
                allowFullScreen
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100 relative">
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#005BAC] to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">Formulir Pesan & Pengaduan</h2>
                  <p className="text-xs text-slate-500">Tuliskan tanggapan, pertanyaan, atau laporan Anda.</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 text-[#005BAC] px-3 py-1 rounded-xl text-[11px] font-extrabold border border-blue-100">
                <Headphones className="w-3.5 h-3.5" />
                <span>Respon Cepat</span>
              </div>
            </div>

            {isSubmitted ? (
              <div className="p-10 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-center space-y-3 my-6 shadow-sm">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-emerald-900 tracking-tight">Pesan Berhasil Terkirim!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Terima kasih. Pesan Anda telah masuk ke sistem pengaduan SAMSAT Banyumas dan akan segera ditindaklanjuti oleh petugas terkait.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Email Aktif *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Nomor WhatsApp / HP</label>
                    <input
                      type="text"
                      placeholder="0812xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Subjek Pesan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Subjek pengaduan / pertanyaan"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-extrabold text-slate-700">Pesan Lengkap *</label>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">{formData.message.length} karakter</span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tuliskan rincian pertanyaan atau pengaduan Anda di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-3.5 rounded-2xl border border-blue-100/80 flex items-center gap-3 text-xs text-slate-600 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#005BAC] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="leading-relaxed">Data dan kerahasiaan pengaduan Anda dilindungi sesuai standar privasi instansi daerah.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#005BAC] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Ke SAMSAT Purwokerto</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};