import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSamsat } from '../../context/SamsatContext';
import { Search, ChevronDown, HelpCircle, Tag } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { faqs } = useSamsat();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  // State untuk efek mengetik teks judul banner
  const fullTitle = "Tanya Jawab Pelayanan (FAQ)";
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTitleComplete, setIsTitleComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTitleComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  // State untuk efek mengetik dinamis pada Placeholder Search Bar
  const searchExamples = [
    "Cari pertanyaan... (misal: syarat stnk 5 tahun)",
    "Cari pertanyaan... (misal: denda pajak kendaraan)",
    "Cari pertanyaan... (misal: cara bayar via signal)"
  ];
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullText = searchExamples[currentExampleIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedPlaceholder(fullText.substring(0, displayedPlaceholder.length + 1));
        if (displayedPlaceholder === fullText) {
          setTimeout(() => setIsDeleting(true), 1500); // Jeda sebelum menghapus
        }
      } else {
        setDisplayedPlaceholder(fullText.substring(0, displayedPlaceholder.length - 1));
        if (displayedPlaceholder === '') {
          setIsDeleting(false);
          setCurrentExampleIndex((prev) => (prev + 1) % searchExamples.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, currentExampleIndex, searchExamples]);

  const categories = ['Semua', 'Persyaratan', 'Prosedur', 'Layanan Digital', 'Lokasi & Jadwal', 'Biaya & Denda'];

  const filteredFaqs = faqs.filter(faq => {
    if (!faq.isEnabled) return false;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || faq.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleAccordion = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="pt-28 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner dengan Animasi Mengetik Judul & Karakter Maskot */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-blue-900 via-[#005BAC] to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl overflow-hidden border border-blue-700/50"
        >
          {/* Efek Cahaya Latar Belakang */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-7 space-y-3 text-center md:text-left">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight min-h-[40px]">
                {displayedTitle}
                {!isTitleComplete && (
                  <span className="inline-block w-1.5 h-6 bg-amber-300 ml-1 animate-pulse align-middle" />
                )}
              </h1>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                Punya pertanyaan seputar syarat, biaya, atau prosedur SAMSAT Purwokerto? Petugas layanan kami siap membantu mencarikan solusinya!
              </p>
            </div>

            {/* Area Maskot dengan Animasi Melayang & Tanda Tanya Berkedip */}
            <div className="md:col-span-5 flex items-center justify-center pt-4 md:pt-0">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="relative flex items-center justify-center"
              >
                {/* Efek Tanda Tanya Berkedip di Sekitar Kepala Karakter */}
                <motion.div
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.1, 0.9] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute -top-3 left-10 text-amber-300 font-black text-lg drop-shadow-md z-20 pointer-events-none"
                >
                  ?
                </motion.div>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1], scale: [1.1, 0.9, 1.1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-3 right-10 text-pink-300 font-black text-lg drop-shadow-md z-20 pointer-events-none"
                >
                  ?
                </motion.div>

                {/* Gambar Karakter Utama */}
                <img
                  src="/images/karakter.png"
                  alt="Maskot Petugas UPPD Banyumas"
                  className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain drop-shadow-2xl rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar dengan Efek Typing Placeholder */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={displayedPlaceholder + "|"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200/80 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#005BAC]"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#005BAC] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List (Modern Interactive Cards) */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
              <HelpCircle className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-bold">Pertanyaan tidak ditemukan</p>
              <p className="text-xs text-slate-400 mt-1">Coba kata kunci lain atau gunakan fitur Asisten Virtual di kanan bawah.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  whileHover={{ scale: 1.005, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                    isOpen 
                      ? 'bg-white border-[#005BAC] shadow-md ring-2 ring-blue-500/10' 
                      : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#005BAC] text-white shadow-md' : 'bg-blue-50 text-[#005BAC]'
                      }`}>
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#005BAC] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 mb-1 inline-block">
                          {faq.category}
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-[#005BAC] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 space-y-3 bg-gradient-to-b from-slate-50/60 to-white">
                          <p className="pl-13 sm:pl-14">{faq.answer}</p>
                          <div className="flex items-center justify-between pt-3 text-xs text-slate-400 border-t border-slate-200/60 pl-13 sm:pl-14">
                            <span className="flex items-center gap-1.5 font-medium text-slate-500">
                              <Tag className="w-3.5 h-3.5 text-[#005BAC]" /> Kategori: {faq.category}
                            </span>
                            <span className="font-medium">Dilihat {faq.viewCount} kali</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};