
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

import {
  PageRoute,
  Announcement,
  ServiceLocation,
  BUMDesPoster,
  PublicDocument,
  FAQItem,
  ContactMessage,
  ChatbotFAQ,
  PADTarget,
  PerformanceReport,
  DashboardStats
} from '../types';

import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SERVICE_LOCATIONS,
  INITIAL_BUMDES_POSTERS,
  INITIAL_DOCUMENTS,
  INITIAL_FAQS,
  INITIAL_CHATBOT_FAQS,
  INITIAL_CONTACT_MESSAGES,
  PAD_TARGETS,
  PERFORMANCE_REPORTS,
  INITIAL_DASHBOARD_STATS
} from '../data/mockData';

import { SakpoleModal } from '../components/shared/SakpoleModal';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface SamsatContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;

  announcements: Announcement[];
  serviceLocations: ServiceLocation[];
  bumdesPosters: BUMDesPoster[];
  documents: PublicDocument[];
  faqs: FAQItem[];
  chatbotFaqs: ChatbotFAQ[];
  contactMessages: ContactMessage[];
  padTargets: PADTarget[];
  performanceReports: PerformanceReport[];
  stats: DashboardStats;

  hasNewNotification: boolean;
  clearNotificationBadge: () => void;

  toasts: Toast[];
  showToast: (
    message: string,
    type?: 'success' | 'error' | 'info'
  ) => void;
  removeToast: (id: string) => void;

  addAnnouncement: (ann: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (
    id: string,
    ann: Partial<Announcement>
  ) => void;
  deleteAnnouncement: (id: string) => void;

  addServiceLocation: (
    loc: Omit<ServiceLocation, 'id'>
  ) => void;
  updateServiceLocation: (
    id: string,
    loc: Partial<ServiceLocation>
  ) => void;
  deleteServiceLocation: (id: string) => void;

  addBumdesPoster: (
    poster: Omit<BUMDesPoster, 'id'>
  ) => void;
  deleteBumdesPoster: (id: string) => void;

  addDocument: (
    doc: Omit<PublicDocument, 'id'>
  ) => void;
  deleteDocument: (id: string) => void;

  addFaq: (
    faq: Omit<FAQItem, 'id' | 'viewCount'>
  ) => void;
  updateFaq: (
    id: string,
    faq: Partial<FAQItem>
  ) => void;
  deleteFaq: (id: string) => void;

  addContactMessage: (
    msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>
  ) => void;
  updateMessageStatus: (
    id: string,
    status: 'New' | 'In Progress' | 'Completed'
  ) => void;
  deleteContactMessage: (id: string) => void;

  addChatbotFaq: (
    botFaq: Omit<ChatbotFAQ, 'id' | 'clickCount'>
  ) => void;
  updateChatbotFaq: (
    id: string,
    botFaq: Partial<ChatbotFAQ>
  ) => void;
  toggleChatbotFaqStatus: (id: string) => void;
  deleteChatbotFaq: (id: string) => void;

  trackLocationClick: (locationName: string) => void;
  trackAppDownload: (
    app: 'signal' | 'sekpole'
  ) => void;

  sakpoleModalOpen: boolean;
  openSakpoleModal: () => void;
  closeSakpoleModal: () => void;
}

const SamsatContext = createContext<
  SamsatContextType | undefined
>(undefined);

const LOCAL_STORAGE_KEY = 'samsat_banyumas_state_v2';

export const SamsatProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [currentPage, setCurrentPageState] =
    useState<PageRoute>('home');

  const [toasts, setToasts] = useState<Toast[]>([]);

  const [hasNewNotification, setHasNewNotification] =
    useState<boolean>(true);

  const [sakpoleModalOpen, setSakpoleModalOpen] =
    useState<boolean>(false);

  // Pengumuman dibaca langsung dari mockData
  // setiap kali halaman dimuat ulang.
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  // Data lain tetap menggunakan localStorage.
  const [serviceLocations, setServiceLocations] =
    useState<ServiceLocation[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_locations`
      );

      return saved
        ? JSON.parse(saved)
        : INITIAL_SERVICE_LOCATIONS;
    });

  const [bumdesPosters, setBumdesPosters] =
    useState<BUMDesPoster[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_posters`
      );

      return saved
        ? JSON.parse(saved)
        : INITIAL_BUMDES_POSTERS;
    });

  const [documents, setDocuments] =
    useState<PublicDocument[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_docs`
      );

      return saved
        ? JSON.parse(saved)
        : INITIAL_DOCUMENTS;
    });

  const [faqs, setFaqs] =
    useState<FAQItem[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_faqs`
      );

      return saved
        ? JSON.parse(saved)
        : INITIAL_FAQS;
    });

  const [chatbotFaqs, setChatbotFaqs] =
    useState<ChatbotFAQ[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_botfaqs`
      );

      return saved
        ? JSON.parse(saved)
        : INITIAL_CHATBOT_FAQS;
    });

  const [contactMessages, setContactMessages] =
    useState<ContactMessage[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_messages`
      );

      return saved
        ? JSON.parse(saved)
        : INITIAL_CONTACT_MESSAGES;
    });

  const [stats, setStats] =
    useState<DashboardStats>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_stats`
      );

      return saved
        ? JSON.parse(saved)
        : INITIAL_DASHBOARD_STATS;
    });

  const [padTargets] =
    useState<PADTarget[]>(PAD_TARGETS);

  const [performanceReports] =
    useState<PerformanceReport[]>(PERFORMANCE_REPORTS);

  // Penyimpanan localStorage
  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_announcements`,
      JSON.stringify(announcements)
    );
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_locations`,
      JSON.stringify(serviceLocations)
    );
  }, [serviceLocations]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_posters`,
      JSON.stringify(bumdesPosters)
    );
  }, [bumdesPosters]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_docs`,
      JSON.stringify(documents)
    );
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_faqs`,
      JSON.stringify(faqs)
    );
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_botfaqs`,
      JSON.stringify(chatbotFaqs)
    );
  }, [chatbotFaqs]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_messages`,
      JSON.stringify(contactMessages)
    );
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_stats`,
      JSON.stringify(stats)
    );
  }, [stats]);

  // Navigasi halaman
  const setCurrentPage = (page: PageRoute) => {
    setCurrentPageState(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const clearNotificationBadge = () => {
    setHasNewNotification(false);
  };

  // Toast notification
  const removeToast = (id: string) => {
    setToasts(prev =>
      prev.filter(t => t.id !== id)
    );
  };

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    const id = Date.now().toString();

    setToasts(prev => [
      ...prev,
      { id, message, type }
    ]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  // Pengumuman
  const addAnnouncement = (
    data: Omit<Announcement, 'id'>
  ) => {
    const newAnn: Announcement = {
      ...data,
      id: `ann-${Date.now()}`,
      isNew: true
    };

    setAnnouncements(prev => [
      newAnn,
      ...prev
    ]);

    setHasNewNotification(true);
    showToast('Pengumuman baru berhasil diterbitkan');
  };

  const updateAnnouncement = (
    id: string,
    data: Partial<Announcement>
  ) => {
    setAnnouncements(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, ...data }
          : a
      )
    );

    showToast('Pengumuman berhasil diperbarui');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev =>
      prev.filter(a => a.id !== id)
    );

    showToast('Pengumuman berhasil dihapus', 'info');
  };

  // Titik layanan
  const addServiceLocation = (
    data: Omit<ServiceLocation, 'id'>
  ) => {
    const newLoc: ServiceLocation = {
      ...data,
      id: `loc-${Date.now()}`
    };

    setServiceLocations(prev => [
      ...prev,
      newLoc
    ]);

    setStats(prev => ({
      ...prev,
      totalLocations: prev.totalLocations + 1
    }));

    showToast('Titik layanan baru berhasil ditambahkan');
  };

  const updateServiceLocation = (
    id: string,
    data: Partial<ServiceLocation>
  ) => {
    setServiceLocations(prev =>
      prev.map(l =>
        l.id === id
          ? { ...l, ...data }
          : l
      )
    );

    showToast('Data titik layanan diperbarui');
  };

  const deleteServiceLocation = (id: string) => {
    setServiceLocations(prev =>
      prev.filter(l => l.id !== id)
    );

    setStats(prev => ({
      ...prev,
      totalLocations: Math.max(
        0,
        prev.totalLocations - 1
      )
    }));

    showToast('Titik layanan dihapus', 'info');
  };

  // Poster BUMDes
  const addBumdesPoster = (
    data: Omit<BUMDesPoster, 'id'>
  ) => {
    const newPoster: BUMDesPoster = {
      ...data,
      id: `poster-${Date.now()}`
    };

    setBumdesPosters(prev => [
      newPoster,
      ...prev
    ]);

    setStats(prev => ({
      ...prev,
      totalPosters: prev.totalPosters + 1
    }));

    showToast('Poster BUMDes berhasil diunggah');
  };

  const deleteBumdesPoster = (id: string) => {
    setBumdesPosters(prev =>
      prev.filter(p => p.id !== id)
    );

    setStats(prev => ({
      ...prev,
      totalPosters: Math.max(
        0,
        prev.totalPosters - 1
      )
    }));

    showToast('Poster BUMDes dihapus', 'info');
  };

  // Dokumen publik
  const addDocument = (
    data: Omit<PublicDocument, 'id'>
  ) => {
    const newDoc: PublicDocument = {
      ...data,
      id: `doc-${Date.now()}`
    };

    setDocuments(prev => [
      newDoc,
      ...prev
    ]);

    setStats(prev => ({
      ...prev,
      totalDocuments: prev.totalDocuments + 1
    }));

    showToast('Dokumen resmi berhasil ditambahkan');
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev =>
      prev.filter(d => d.id !== id)
    );

    setStats(prev => ({
      ...prev,
      totalDocuments: Math.max(
        0,
        prev.totalDocuments - 1
      )
    }));

    showToast('Dokumen dihapus', 'info');
  };

  // FAQ
  const addFaq = (
    data: Omit<FAQItem, 'id' | 'viewCount'>
  ) => {
    const newFaq: FAQItem = {
      ...data,
      id: `faq-${Date.now()}`,
      viewCount: 0
    };

    setFaqs(prev => [
      newFaq,
      ...prev
    ]);

    setStats(prev => ({
      ...prev,
      totalFaqs: prev.totalFaqs + 1
    }));

    showToast('Pertanyaan FAQ berhasil ditambahkan');
  };

  const updateFaq = (
    id: string,
    data: Partial<FAQItem>
  ) => {
    setFaqs(prev =>
      prev.map(f =>
        f.id === id
          ? { ...f, ...data }
          : f
      )
    );

    showToast('FAQ berhasil diperbarui');
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev =>
      prev.filter(f => f.id !== id)
    );

    setStats(prev => ({
      ...prev,
      totalFaqs: Math.max(
        0,
        prev.totalFaqs - 1
      )
    }));

    showToast('FAQ dihapus', 'info');
  };

  // Pesan masyarakat
  const addContactMessage = (
    data: Omit<
      ContactMessage,
      'id' | 'createdAt' | 'status'
    >
  ) => {
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      status: 'New',
      createdAt: new Date()
        .toISOString()
        .replace('T', ' ')
        .substring(0, 16)
    };

    setContactMessages(prev => [
      newMsg,
      ...prev
    ]);

    setStats(prev => ({
      ...prev,
      unreadMessages: prev.unreadMessages + 1
    }));

    showToast(
      'Pesan Anda telah berhasil dikirim ke Petugas SAMSAT Banyumas'
    );
  };

  const updateMessageStatus = (
    id: string,
    status: 'New' | 'In Progress' | 'Completed'
  ) => {
    setContactMessages(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, status }
          : m
      )
    );

    showToast(
      `Status pesan diperbarui menjadi '${status}'`
    );
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages(prev =>
      prev.filter(m => m.id !== id)
    );

    showToast('Pesan dihapus', 'info');
  };

  // Chatbot FAQ
  const addChatbotFaq = (
    data: Omit<ChatbotFAQ, 'id' | 'clickCount'>
  ) => {
    const newBotFaq: ChatbotFAQ = {
      ...data,
      id: `bot-${Date.now()}`,
      clickCount: 0
    };

    setChatbotFaqs(prev => [
      ...prev,
      newBotFaq
    ]);

    showToast('Respons Asisten Virtual ditambahkan');
  };

  const updateChatbotFaq = (
    id: string,
    data: Partial<ChatbotFAQ>
  ) => {
    setChatbotFaqs(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, ...data }
          : c
      )
    );

    showToast('Respons Asisten Virtual diperbarui');
  };

  const toggleChatbotFaqStatus = (id: string) => {
    setChatbotFaqs(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, isEnabled: !c.isEnabled }
          : c
      )
    );

    showToast('Status respons bot diperbarui');
  };

  const deleteChatbotFaq = (id: string) => {
    setChatbotFaqs(prev =>
      prev.filter(c => c.id !== id)
    );

    showToast('Respons Asisten Virtual dihapus', 'info');
  };

  // Statistik klik lokasi
  const trackLocationClick = (locationName: string) => {
    setStats(prev => {
      const existing = prev.locationClicks.find(
        l => l.locationName === locationName
      );

      let updatedClicks;

      if (existing) {
        updatedClicks = prev.locationClicks.map(l =>
          l.locationName === locationName
            ? { ...l, clicks: l.clicks + 1 }
            : l
        );
      } else {
        updatedClicks = [
          ...prev.locationClicks,
          { locationName, clicks: 1 }
        ];
      }

      return {
        ...prev,
        locationClicks: updatedClicks
      };
    });
  };

  // Statistik unduhan aplikasi
  const trackAppDownload = (
    app: 'signal' | 'sekpole'
  ) => {
    setStats(prev => ({
      ...prev,
      appDownloadsSignal:
        app === 'signal'
          ? prev.appDownloadsSignal + 1
          : prev.appDownloadsSignal,
      appDownloadsSekpole:
        app === 'sekpole'
          ? prev.appDownloadsSekpole + 1
          : prev.appDownloadsSekpole
    }));

    showToast(
      `Membuka tautan unduh ${
        app === 'signal' ? 'SIGNAL' : 'Sekpole'
      }`,
      'info'
    );
  };

  // Modal SAKPOLE
  const openSakpoleModal = () => {
    setSakpoleModalOpen(true);

    setStats(prev => ({
      ...prev,
      sakpoleIntegrationClicks:
        prev.sakpoleIntegrationClicks + 1
    }));
  };

  const closeSakpoleModal = () => {
    setSakpoleModalOpen(false);
  };

  return (
    <SamsatContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        announcements,
        serviceLocations,
        bumdesPosters,
        documents,
        faqs,
        chatbotFaqs,
        contactMessages,
        padTargets,
        performanceReports,
        stats,
        hasNewNotification,
        clearNotificationBadge,
        toasts,
        showToast,
        removeToast,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        addServiceLocation,
        updateServiceLocation,
        deleteServiceLocation,
        addBumdesPoster,
        deleteBumdesPoster,
        addDocument,
        deleteDocument,
        addFaq,
        updateFaq,
        deleteFaq,
        addContactMessage,
        updateMessageStatus,
        deleteContactMessage,
        addChatbotFaq,
        updateChatbotFaq,
        toggleChatbotFaqStatus,
        deleteChatbotFaq,
        trackLocationClick,
        trackAppDownload,
        sakpoleModalOpen,
        openSakpoleModal,
        closeSakpoleModal
      }}
    >
      {children}

      {sakpoleModalOpen && <SakpoleModal />}

      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 ${
              toast.type === 'error'
                ? 'bg-red-50 text-red-800 border-red-200'
                : toast.type === 'info'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                toast.type === 'error'
                  ? 'bg-red-500'
                  : toast.type === 'info'
                  ? 'bg-blue-500'
                  : 'bg-emerald-500'
              }`}
            />

            <span>{toast.message}</span>

            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </SamsatContext.Provider>
  );
};

export const useSamsat = () => {
  const context = useContext(SamsatContext);

  if (!context) {
    throw new Error(
      'useSamsat must be used within a SamsatProvider'
    );
  }

  return context;
};