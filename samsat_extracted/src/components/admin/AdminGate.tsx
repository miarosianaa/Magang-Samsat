import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';

// Entry point for the fully separated Admin Dashboard.
// Reached only via the #admin URL hash, kept independent from the public
// site's Navbar / Footer, with its own lightweight session-based login gate.
export const AdminGate: React.FC = () => {
  const [authed, setAuthed] = useState<boolean>(() => sessionStorage.getItem('samsat_admin_session') === '1');

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <AdminLayout
      onLogout={() => {
        sessionStorage.removeItem('samsat_admin_session');
        setAuthed(false);
        window.location.hash = '';
      }}
    />
  );
};
