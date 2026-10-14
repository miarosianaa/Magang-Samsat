import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, MapPin, Smartphone, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Pelayanan Cepat',
      desc: 'Waktu proses rata-rata di bawah 10 menit untuk pengesahan STNK tahunan di seluruh titik layanan.',
      icon: Zap,
      color: 'bg-amber-500'
    },
    {
      title: 'Transparan & Bebas Pungli',
      desc: 'Sistem penetapan pajak terintegrasi dengan kepastian tarif resmi sesuai regulasi daerah.',
      icon: ShieldCheck,
      color: 'bg-emerald-500'
    },
    {
      title: 'Kemudahan Akses Terdekat',
      desc: 'Hadir di 10 titik kantor, Drive Thru, Mall, hingga 32 BUMDes mitra di tingkat desa.',
      icon: MapPin,
      color: 'bg-[#005BAC]'
    },
    {
      title: 'Full Layanan Digital',
      desc: 'Bayar pajak dari mana saja tanpa perlu mengantre melalui aplikasi SIGNAL & Sekpole.',
      icon: Smartphone,
      color: 'bg-sky-500'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#005BAC] bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Komitmen Pelayanan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Mengapa Memilih SAMSAT Purwokerto?
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Inovasi pelayanan publik berstandar Zona Integritas Wilayah Bebas dari Korupsi (WBK).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} text-white flex items-center justify-center shadow-md mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
