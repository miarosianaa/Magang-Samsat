import React from 'react';
import { ServiceLocation } from '../../types';
import { X, MapPin, Clock, Phone, ExternalLink, Navigation } from 'lucide-react';

interface LocationMapModalProps {
  location: ServiceLocation;
  onClose: () => void;
}

// Builds a keyless Google Maps embed URL from a text query (address / place name).
// Falls back to this whenever a location doesn't already have a custom mapsEmbedUrl.
const buildEmbedUrl = (query: string) => {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
};

export const LocationMapModal: React.FC<LocationMapModalProps> = ({ location, onClose }) => {
  const embedSrc = location.mapsEmbedUrl || buildEmbedUrl(`${location.name} ${location.address}`);

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b border-slate-100 bg-gradient-to-r from-[#005BAC] to-[#003d75] text-white">
          <div className="space-y-1.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-white/15 border border-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <MapPin className="w-3 h-3" /> {location.type.replace('-', ' ')}
            </span>
            <h3 className="text-lg font-extrabold leading-tight truncate">{location.name}</h3>
            <p className="text-xs text-blue-100 leading-relaxed line-clamp-2">{location.address}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Map */}
        <div className="relative w-full bg-slate-100" style={{ aspectRatio: '16 / 10' }}>
          <iframe
            title={`Peta Lokasi ${location.name}`}
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', inset: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Footer Details + Actions */}
        <div className="p-5 space-y-4 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#005BAC] shrink-0 mt-0.5" />
              <span>{location.operatingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#005BAC] shrink-0" />
              <span>{location.phone}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 rounded-xl bg-[#005BAC] hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Buka di Aplikasi Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
