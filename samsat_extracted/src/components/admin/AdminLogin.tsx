import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, LogIn } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

// Demo credentials for this front-end mock admin console.
// Replace with real authentication once connected to a backend.
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'samsat2026';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setError('');
      sessionStorage.setItem('samsat_admin_session', '1');
      onSuccess();
    } else {
      setError('Username atau kata sandi salah. Silakan coba kembali.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#00305e] to-[#005BAC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <button
        onClick={() => {
          window.location.hash = '';
        }}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-blue-100 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Situs Publik
      </button>

      <div className="relative w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
          {/* Brand dengan Logo Bapenda */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center p-2">
              <img
                src="/logo-bapenda.png"
                alt="Logo Bapenda"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">SAMSAT Banyumas</h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Admin Console</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Area Terbatas Petugas
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#005BAC] hover:bg-blue-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk ke Dashboard</span>
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-400 leading-relaxed">
            Demo akses: <span className="font-mono font-bold text-slate-500">admin</span> /{' '}
            <span className="font-mono font-bold text-slate-500">samsat2026</span>. Hubungkan ke sistem otentikasi
            resmi sebelum digunakan secara produksi.
          </p>
        </div>
      </div>
    </div>
  );
};