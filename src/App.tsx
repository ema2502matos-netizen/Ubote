/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DotsNavigation } from './components/DotsNavigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { EcosystemSection } from './components/EcosystemSection';
import { SocialProofSection } from './components/SocialProofSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PdfModal } from './components/PdfModal';
import { B2BModal } from './components/B2BModal';
import { LoyaltyCardModal } from './components/LoyaltyCardModal';
import { WhatsAppAiModal } from './components/WhatsAppAiModal';

export default function App() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [isWhatsAppAiModalOpen, setIsWhatsAppAiModalOpen] = useState(false);
  const [whatsAppAiPrompt, setWhatsAppAiPrompt] = useState<string>('');
  const [preselectedService, setPreselectedService] = useState<string>('');

  const handleOpenWhatsAppAi = (prompt?: string) => {
    setWhatsAppAiPrompt(prompt || '');
    setIsWhatsAppAiModalOpen(true);
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    setPreselectedService(serviceName);
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1118] text-[#F3F4F6] relative selection:bg-[#C5A869]/30 selection:text-[#E2C384]">
      {/* Top Header Navigation (One-row, 3-zone contract) */}
      <Header
        onOpenPdf={() => setIsPdfModalOpen(true)}
        onOpenB2BModal={() => setIsB2BModalOpen(true)}
        onOpenLoyaltyModal={() => setIsLoyaltyModalOpen(true)}
        onOpenWhatsAppAi={() => handleOpenWhatsAppAi()}
      />

      {/* Side Dots Navigation (Smooth Section Transition Indicator) */}
      <DotsNavigation />

      {/* Main Single Page Sections */}
      <main>
        {/* Section 1: Hero (Marca / Impacto / Beleza com Raízes) */}
        <HeroSection
          onOpenPdf={() => setIsPdfModalOpen(true)}
          onOpenB2BModal={() => setIsB2BModalOpen(true)}
          onOpenLoyaltyModal={() => setIsLoyaltyModalOpen(true)}
        />

        {/* Section 2: Sobre Nós & Manifesto (Branding) */}
        <AboutSection />

        {/* Section 3: Soluções & Serviços (Vendas & Preçário Oficial em Kwanzas) */}
        <ServicesSection
          onOpenPdf={() => setIsPdfModalOpen(true)}
          onOpenB2BModal={() => setIsB2BModalOpen(true)}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Section 4: Ecossistema & Network Corporativo (B2B & Parcerias) */}
        <EcosystemSection onOpenB2BModal={() => setIsB2BModalOpen(true)} />

        {/* Section 5: Prova Social & Métricas de Sucesso (Confiança) */}
        <SocialProofSection />

        {/* Section 6: Contacto & Conversão Inteligente (Lead Gen & WhatsApp Corporate) */}
        <ContactSection
          preselectedService={preselectedService}
          onClearPreselectedService={() => setPreselectedService('')}
          onOpenLoyaltyModal={() => setIsLoyaltyModalOpen(true)}
          onOpenWhatsAppAi={() => handleOpenWhatsAppAi()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPdf={() => setIsPdfModalOpen(true)}
        onOpenB2BModal={() => setIsB2BModalOpen(true)}
        onOpenLoyaltyModal={() => setIsLoyaltyModalOpen(true)}
      />

      {/* Floating Corporate WhatsApp Direct Action */}
      <FloatingWhatsApp onOpenWhatsAppAi={() => handleOpenWhatsAppAi()} />

      {/* Official 2026 PDF Catalog Viewer Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onSelectService={(service) => {
          setIsPdfModalOpen(false);
          handleSelectServiceForBooking(service);
        }}
      />

      {/* Corporate B2B Agreement & Vouchers Proposal Modal */}
      <B2BModal
        isOpen={isB2BModalOpen}
        onClose={() => setIsB2BModalOpen(false)}
      />

      {/* Authentic Loyalty Card & Business Card Modal */}
      <LoyaltyCardModal
        isOpen={isLoyaltyModalOpen}
        onClose={() => setIsLoyaltyModalOpen(false)}
      />

      {/* Interactive WhatsApp AI Assistant & API Console Modal */}
      <WhatsAppAiModal
        isOpen={isWhatsAppAiModalOpen}
        onClose={() => setIsWhatsAppAiModalOpen(false)}
        initialPrompt={whatsAppAiPrompt}
      />
    </div>
  );
}
