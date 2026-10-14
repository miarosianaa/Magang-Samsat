import React, { useState } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { LogOut, ShieldCheck, User, X } from 'lucide-react';

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [confirmLogout, setConfirmLogout] = useState(false);

  // Fungsi untuk memicu perpindahan tab ke settings secara otomatis
  const handleOpenSettings = () => {
    const settingsTabBtn = Array.from(document.querySelectorAll('button')).find(
      (el) => el.textContent?.includes('Pengaturan Sistem')
    );
    if (settingsTabBtn) {
      (settingsTabBtn as HTMLButtonElement).click();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Standalone Admin Top Bar */}
      <header className="sticky top-0 z-40 h-16 bg-slate-900 border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Gambar Bapenda */}
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-md border border-slate-700">
              <img
                src="/logo-bapenda.png"
                alt="Logo Bapenda"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <p className="font-black text-white text-sm leading-none">SAMSAT Banyumas</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Admin Console</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-2 text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Sesi Aktif
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Card Username Admin dengan Efek Zoom Saat Diklik */}
            <div
              onClick={handleOpenSettings}
              className="hidden sm:flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl shadow-inner text-left cursor-pointer hover:bg-slate-700/80 transition-all active:scale-95 hover:border-sky-500/50 group"
              title="Klik untuk membuka Pengaturan Profil"
            >
              <div className="w-7 h-7 rounded-full bg-[#005BAC]/30 border border-[#005BAC]/50 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight group-hover:text-sky-400 transition-colors">Admin SAMSAT</p>
                <p className="text-[10px] text-slate-400 font-medium">admin.banyumas@samsat.jatengprov.go.id</p>
              </div>
            </div>

            {!confirmLogout ? (
              <button
                onClick={() => setConfirmLogout(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/20 transition-all active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onLogout}
                  className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all active:scale-95"
                >
                  Ya, Keluar
                </button>
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all active:scale-95"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AdminDashboard />
    </div>
  );
};