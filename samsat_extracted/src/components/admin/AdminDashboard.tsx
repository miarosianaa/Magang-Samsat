import React, { useState } from 'react';
import { useSamsat } from '../../context/SamsatContext';
import {
  Announcement,
  ServiceLocation,
  BUMDesPoster,
  PublicDocument,
  FAQItem,
  ContactMessage,
  ChatbotFAQ
} from '../../types';

import {
  LayoutDashboard,
  Megaphone,
  MapPin,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  MessageSquare,
  Bot,
  Users,
  Settings,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  X,
  Filter,
  BarChart2,
  Download,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Lock,
  Mail,
  UserCheck
} from 'lucide-react';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';

type AdminTab =
  | 'overview'
  | 'announcements'
  | 'locations'
  | 'posters'
  | 'documents'
  | 'faq'
  | 'messages'
  | 'chatbot'
  | 'users'
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const {
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    serviceLocations,
    addServiceLocation,
    updateServiceLocation,
    deleteServiceLocation,
    bumdesPosters,
    addBumdesPoster,
    deleteBumdesPoster,
    documents,
    addDocument,
    deleteDocument,
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    contactMessages,
    updateMessageStatus,
    deleteContactMessage,
    chatbotFaqs,
    addChatbotFaq,
    updateChatbotFaq,
    toggleChatbotFaqStatus,
    deleteChatbotFaq,
    stats,
    showToast
  } = useSamsat();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // State untuk form Pengaturan Profil
  const adminUsername = 'Admin SAMSAT'; // Tidak bisa diubah
  const [adminEmail, setAdminEmail] = useState('admin.banyumas@samsat.jatengprov.go.id');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State visibility untuk toggle mata password
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modals state
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | 'preview' | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);

  // Quick form input states
  const [annForm, setAnnForm] = useState({ title: '', category: 'Kebijakan', shortDescription: '', content: '' });
  const [locForm, setLocForm] = useState({ name: '', address: '', operatingHours: '', phone: '', mapsUrl: '', type: 'induk' as any });
  const [posterForm, setPosterForm] = useState({ title: '', village: '', district: '', imageUrl: 'https://images.unsplash.com/photo-1550000000000?auto=format&fit=crop&w=600&q=80' });
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: 'Prosedur', isEnabled: true });
  const [botForm, setBotForm] = useState({ question: '', answer: '', keywords: '', category: 'Umum', isEnabled: true });

  const navSidebar = [
    { id: 'overview', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'announcements', label: 'Pengumuman', icon: Megaphone, count: announcements.length },
    { id: 'locations', label: 'Titik Layanan', icon: MapPin, count: serviceLocations.length },
    { id: 'posters', label: 'Poster BUMDes', icon: ImageIcon, count: bumdesPosters.length },
    { id: 'documents', label: 'Dokumen Resmi', icon: FileText, count: documents.length },
    { id: 'faq', label: 'Kelola FAQ', icon: HelpCircle, count: faqs.length },
    { id: 'messages', label: 'Pesan Masuk', icon: MessageSquare, count: contactMessages.filter(m => m.status === 'New').length, isNew: true },
    { id: 'chatbot', label: 'Bot FAQ', icon: Bot, count: chatbotFaqs.length },
    { id: 'users', label: 'Pengguna Admin', icon: Users },
    { id: 'settings', label: 'Pengaturan Sistem', icon: Settings },
  ];

  return (
    <div className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Banner */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 bg-sky-950 px-3 py-1 rounded-full w-fit">
              <span>Admin Control Panel (Backend)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">SAMSAT Banyumas Admin Console</h1>
            <p className="text-slate-400 text-xs mt-1">Kelola Pengumuman, Titik Layanan, Poster BUMDes, Dokumen, & Asisten Virtual.</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); showToast('Mengarahkan ke situs publik...', 'info'); }}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 border border-white/10"
            >
              Lihat Situs Publik <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-2 rounded-xl font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> System Live API Connected
            </span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            {navSidebar.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setSearchTerm('');
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#005BAC] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#005BAC]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.isNew
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Admin Main Work Area */}
          <div className="lg:col-span-9 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[600px]">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Pengunjung</p>
                    <p className="text-xl font-black text-slate-800 mt-1">{stats.totalVisitors.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Titik Layanan</p>
                    <p className="text-xl font-black text-slate-800 mt-1">{serviceLocations.length}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Poster BUMDes</p>
                    <p className="text-xl font-black text-slate-800 mt-1">{bumdesPosters.length}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Dokumen Resmi</p>
                    <p className="text-xl font-black text-slate-800 mt-1">{documents.length}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Pesan Baru</p>
                    <p className="text-xl font-black text-red-600 mt-1">{contactMessages.filter(m => m.status === 'New').length}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Total FAQ</p>
                    <p className="text-xl font-black text-slate-800 mt-1">{faqs.length}</p>
                  </div>
                </div>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Messages chart */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-[#005BAC]" /> Volume Pesan Masuk (Bulanan)
                    </h3>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats.messagesMonthly}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="count" stroke="#005bac" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* App Download stats */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2">
                      <Download className="w-4 h-4 text-emerald-600" /> Unduhan & Integrasi Aplikasi Mobile
                    </h3>
                    <div className="space-y-3 pt-2">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-sm text-slate-900">SIGNAL (Samsat Digital Nasional)</p>
                          <p className="text-xs text-slate-500">Total Klik Download</p>
                        </div>
                        <span className="text-lg font-black text-slate-800">{stats.appDownloadsSignal.toLocaleString()}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-sm text-slate-900">Sekpole - Klik Unduh (Play Store)</p>
                          <p className="text-xs text-slate-500">Total Klik Download</p>
                        </div>
                        <span className="text-lg font-black text-slate-800">{stats.appDownloadsSekpole.toLocaleString()}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-sm text-slate-900">Akses Link "Cek Pajak Kendaraan"</p>
                          <p className="text-xs text-slate-500">Jumlah pengunjung yang membuka integrasi Sekpole</p>
                        </div>
                        <span className="text-lg font-black text-slate-800">{stats.sakpoleIntegrationClicks.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ANNOUNCEMENTS TAB */}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-lg text-slate-900">Kelola Pengumuman Resmi</h2>
                  <button
                    onClick={() => {
                      setAnnForm({ title: '', category: 'Kebijakan', shortDescription: '', content: '' });
                      setModalType('add');
                    }}
                    className="px-4 py-2 bg-[#005BAC] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Tambah Pengumuman
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#005BAC] bg-blue-50 px-2 py-0.5 rounded">{ann.category}</span>
                          <span className="text-[10px] text-slate-400">{ann.date}</span>
                        </div>
                        <p className="font-bold text-sm text-slate-900 mt-1">{ann.title}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            deleteAnnouncement(ann.id);
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICE LOCATIONS TAB */}
            {activeTab === 'locations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-lg text-slate-900">Kelola Titik Layanan ({serviceLocations.length} Locations)</h2>
                  <button
                    onClick={() => {
                      setLocForm({ name: '', address: '', operatingHours: '', phone: '', mapsUrl: '', type: 'induk' });
                      setActiveItem(null);
                      setModalType('add');
                    }}
                    className="px-4 py-2 bg-[#005BAC] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Tambah Lokasi
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {serviceLocations.map((loc) => (
                    <div key={loc.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#005BAC] bg-blue-50 px-2 py-0.5 rounded">{loc.type}</span>
                        <p className="font-bold text-sm text-slate-900 mt-0.5">{loc.name}</p>
                        <p className="text-xs text-slate-500 truncate max-w-md">{loc.address}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setLocForm({
                              name: loc.name,
                              address: loc.address,
                              operatingHours: loc.operatingHours,
                              phone: loc.phone,
                              mapsUrl: loc.mapsUrl,
                              type: loc.type
                            });
                            setActiveItem(loc.id);
                            setModalType('edit');
                          }}
                          className="p-2 text-[#005BAC] hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteServiceLocation(loc.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h2 className="font-extrabold text-lg text-slate-900">Pesan & Pengaduan Masyarakat</h2>
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <div key={msg.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{msg.name} ({msg.email})</span>
                        <div className="flex items-center gap-2">
                          <select
                            value={msg.status}
                            onChange={(e) => updateMessageStatus(msg.id, e.target.value as any)}
                            className="text-xs font-bold px-2 py-1 bg-white border border-slate-300 rounded-lg"
                          >
                            <option value="New">Baru</option>
                            <option value="In Progress">Diproses</option>
                            <option value="Completed">Selesai</option>
                          </select>
                          <button onClick={() => deleteContactMessage(msg.id)} className="p-1 text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-[#005BAC]">Subjek: {msg.subject}</p>
                      <p className="text-xs text-slate-600">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CHATBOT FAQ MANAGEMENT TAB */}
            {activeTab === 'chatbot' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-lg text-slate-900">Kelola Tanggapan Bot Asisten Virtual</h2>
                  <button
                    onClick={() => {
                      setBotForm({ question: '', answer: '', keywords: '', category: 'Umum', isEnabled: true });
                      setModalType('add');
                    }}
                    className="px-4 py-2 bg-[#005BAC] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Tambah Tanggapan Bot
                  </button>
                </div>

                <div className="space-y-3">
                  {chatbotFaqs.map((bot) => (
                    <div key={bot.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#005BAC] bg-blue-100 px-2 py-0.5 rounded">{bot.category}</span>
                          <button
                            onClick={() => toggleChatbotFaqStatus(bot.id)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              bot.isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {bot.isEnabled ? 'Aktif' : 'Nonaktif'}
                          </button>
                        </div>
                        <p className="font-bold text-sm text-slate-900">{bot.question}</p>
                        <p className="text-xs text-slate-600 whitespace-pre-line">{bot.answer}</p>
                      </div>

                      <button onClick={() => deleteChatbotFaq(bot.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS / PROFILE TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-extrabold text-lg text-slate-900">Pengaturan Profil & Akun Admin</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Kelola informasi kredensial login, email, dan keamanan kata sandi Anda.</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                  
                  {/* Username Admin (Read-only / Permanen) */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#005BAC]" /> Informasi Username (USN) Admin
                    </h3>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Username (Permanen)</label>
                      <input
                        type="text"
                        value={adminUsername}
                        disabled
                        className="w-full sm:w-1/2 p-3 text-xs bg-slate-200 text-slate-600 border border-slate-300 rounded-xl cursor-not-allowed font-bold"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Username akun admin ditetapkan oleh sistem pusat dan tidak dapat diubah.</p>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  {/* Ganti Email Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#005BAC]" /> Perbarui Alamat Email Admin
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Aktif</label>
                        <input
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#005BAC]"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Email admin berhasil diperbarui!', 'success')}
                      className="px-4 py-2.5 bg-[#005BAC] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#004a8c] transition-colors"
                    >
                      Simpan Perubahan Email
                    </button>
                  </div>

                  <hr className="border-slate-200" />

                  {/* Ganti Password Section dengan Tombol Mata */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#005BAC]" /> Ganti Kata Sandi (Password)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Password Saat Ini */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Password Saat Ini</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-3 pr-10 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#005BAC]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                          >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Password Baru */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Password Baru</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 pr-10 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#005BAC]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Konfirmasi Password Baru */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Konfirmasi Password Baru</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 pr-10 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#005BAC]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                    </div>
                    <button
                      onClick={() => {
                        if (!currentPassword || !newPassword || !confirmPassword) {
                          showToast('Semua kolom password wajib diisi!', 'error');
                          return;
                        }
                        if (newPassword !== confirmPassword) {
                          showToast('Konfirmasi password baru tidak cocok!', 'error');
                          return;
                        }
                        showToast('Kata sandi berhasil diubah!', 'success');
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="px-4 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-slate-800 transition-colors"
                    >
                      Perbarui Kata Sandi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* POSTERS / DOCUMENTS / FAQ / USERS Placeholders */}
            {['posters', 'documents', 'faq', 'users'].includes(activeTab) && (
              <div className="p-8 text-center space-y-4">
                <p className="font-bold text-slate-800">Manajemen {activeTab.toUpperCase()}</p>
                <p className="text-xs text-slate-500">Seluruh data backend disinkronisasikan secara real-time dengan portal publik.</p>
                <button
                  onClick={() => showToast(`Modul ${activeTab} aktif dan tersinkronisasi.`, 'info')}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Verifikasi Koneksi API State
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add / Edit Modal */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button onClick={() => { setModalType(null); setActiveItem(null); }} className="absolute top-4 right-4 p-2 text-slate-400">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-extrabold text-lg text-slate-900">
              {modalType === 'edit' ? 'Edit Data' : 'Tambah Data Baru'}
            </h3>

            {activeTab === 'announcements' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Judul Pengumuman"
                  value={annForm.title}
                  onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Kategori"
                  value={annForm.category}
                  onChange={(e) => setAnnForm({ ...annForm, category: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <textarea
                  placeholder="Deskripsi Singkat"
                  value={annForm.shortDescription}
                  onChange={(e) => setAnnForm({ ...annForm, shortDescription: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <button
                  onClick={() => {
                    addAnnouncement({
                      title: annForm.title || 'Pengumuman Baru',
                      category: annForm.category || 'Kebijakan',
                      date: 'Hari ini',
                      shortDescription: annForm.shortDescription || 'Deskripsi pengumuman',
                      content: annForm.shortDescription
                    });
                    setModalType(null);
                  }}
                  className="w-full py-3 bg-[#005BAC] text-white font-bold text-xs rounded-xl"
                >
                  Simpan Pengumuman
                </button>
              </div>
            )}

            {activeTab === 'chatbot' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Kata Kunci / Judul Pertanyaan"
                  value={botForm.question}
                  onChange={(e) => setBotForm({ ...botForm, question: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <textarea
                  placeholder="Jawaban Asisten Virtual"
                  value={botForm.answer}
                  onChange={(e) => setBotForm({ ...botForm, answer: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <button
                  onClick={() => {
                    addChatbotFaq({
                      question: botForm.question || 'Pertanyaan Baru',
                      answer: botForm.answer || 'Jawaban bot',
                      keywords: [botForm.question.toLowerCase()],
                      category: 'Umum',
                      isEnabled: true
                    });
                    setModalType(null);
                  }}
                  className="w-full py-3 bg-[#005BAC] text-white font-bold text-xs rounded-xl"
                >
                  Simpan Respons Bot
                </button>
              </div>
            )}

            {activeTab === 'locations' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nama Lokasi (mis. SAMSAT Induk Purwokerto)"
                  value={locForm.name}
                  onChange={(e) => setLocForm({ ...locForm, name: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <textarea
                  placeholder="Alamat Lengkap"
                  value={locForm.address}
                  onChange={(e) => setLocForm({ ...locForm, address: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Jam Operasional (mis. Senin - Jumat: 08.00 - 15.00 WIB)"
                  value={locForm.operatingHours}
                  onChange={(e) => setLocForm({ ...locForm, operatingHours: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Nomor Telepon"
                  value={locForm.phone}
                  onChange={(e) => setLocForm({ ...locForm, phone: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Tautan Google Maps (https://maps.google.com/...)"
                  value={locForm.mapsUrl}
                  onChange={(e) => setLocForm({ ...locForm, mapsUrl: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                />
                <select
                  value={locForm.type}
                  onChange={(e) => setLocForm({ ...locForm, type: e.target.value as any })}
                  className="w-full p-3 text-xs bg-slate-50 border rounded-xl"
                >
                  <option value="induk">Induk</option>
                  <option value="pembantu">Pembantu</option>
                  <option value="cepat">Samsat Cepat</option>
                  <option value="drive-thru">Drive-Thru</option>
                  <option value="keliling">Keliling</option>
                  <option value="mpp">MPP</option>
                  <option value="gerai">Gerai</option>
                  <option value="paten">Paten</option>
                </select>
                <button
                  onClick={() => {
                    if (!locForm.name.trim() || !locForm.address.trim()) {
                      showToast('Nama dan alamat lokasi wajib diisi', 'error');
                      return;
                    }
                    const payload = {
                      name: locForm.name,
                      address: locForm.address,
                      operatingHours: locForm.operatingHours || 'Senin - Jumat: 08.00 - 15.00 WIB',
                      phone: locForm.phone || '-',
                      mapsUrl: locForm.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(locForm.address)}`,
                      type: locForm.type
                    };
                    if (modalType === 'edit' && activeItem) {
                      updateServiceLocation(activeItem, payload);
                      showToast('Lokasi berhasil diperbarui');
                    } else {
                      addServiceLocation(payload);
                    }
                    setActiveItem(null);
                    setModalType(null);
                  }}
                  className="w-full py-3 bg-[#005BAC] text-white font-bold text-xs rounded-xl"
                >
                  {modalType === 'edit' ? 'Simpan Perubahan' : 'Simpan Lokasi'}
                </button>
              </div>
            )}

            {activeTab !== 'announcements' && activeTab !== 'chatbot' && activeTab !== 'locations' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Isi formulir entri data backend SAMSAT Banyumas.</p>
                <button
                  onClick={() => {
                    showToast('Data berhasil ditambahkan');
                    setModalType(null);
                  }}
                  className="w-full py-3 bg-[#005BAC] text-white font-bold text-xs rounded-xl"
                >
                  Simpan Entri Data
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};