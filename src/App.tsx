/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Page, ContactSource } from './types';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Solutions } from './pages/Solutions';
import { TalentHub } from './pages/TalentHub';
import { Insights } from './pages/Insights';
import { Company } from './pages/Company';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [contactSource, setContactSource] = useState<ContactSource | null>(null);
  const pendingScrollRef = useRef(false);

  const navigateToContact = useCallback((source: ContactSource) => {
    setContactSource(source);
    if (currentPage === 'company') {
      // Already on the page, just scroll
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Navigate first, then scroll after render
      pendingScrollRef.current = true;
      setCurrentPage('company');
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'company' && pendingScrollRef.current) {
      pendingScrollRef.current = false;
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} navigateToContact={navigateToContact} />;
      case 'solutions':
        return <Solutions setPage={setCurrentPage} navigateToContact={navigateToContact} />;
      case 'talent':
        return <TalentHub setPage={setCurrentPage} navigateToContact={navigateToContact} />;
      case 'insights':
        return <Insights setPage={setCurrentPage} navigateToContact={navigateToContact} />;
      case 'company':
        return <Company setPage={setCurrentPage} contactSource={contactSource} navigateToContact={navigateToContact} />;
      default:
        return <Home setPage={setCurrentPage} navigateToContact={navigateToContact} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setPage={setCurrentPage} navigateToContact={navigateToContact}>
      {renderPage()}
    </Layout>
  );
}
