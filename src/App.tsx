import React, { useState, useEffect, useRef } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { CheckCircle, Gem } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PainPointsAndSolutions } from './components/PainPointsAndSolutions';
import { AppVideoDemo } from './components/AppVideoDemo';
import { WhiteLabelDemo } from './components/WhiteLabelDemo';
import { RoutineDiagnostic } from './components/RoutineDiagnostic';
import { PricingSection } from './components/PricingSection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { MobilePlansSheet } from './components/MobilePlansSheet';
import { CapturedLead, SubscriptionPlan } from './types';
import { BRAND, buildWhatsAppUrl } from './config/brand';
import { sendLead } from './config/leads';

const INITIAL_DEMO_LEADS: CapturedLead[] = [
  {
    id: 'demo-1',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    designerName: 'Juliana Costa',
    studioName: 'Ateliê Juliana Lash & Brow',
    whatsapp: '(31) 98844-1234',
    instagram: '@julianalash.bh',
    email: 'juliana.lash@gmail.com',
    weeklyClients: 22,
    dailyChatHours: 2.5,
    calculatedTimeSavedMonthlyHours: 60,
    monthlyNoShows: 4,
    averageTicket: 180,
    calculatedRevenueRecoveredMonthly: 720,
    biggestPainPoint: 'Mensagens tarde da noite e nos finais de semana perguntando "tem horário?"',
  },
  {
    id: 'demo-2',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    designerName: 'Marcella Prado',
    studioName: 'Studio Glam Lash',
    whatsapp: '(11) 99123-9988',
    instagram: '@marcellapradolash',
    email: 'marcellaprado@hotmail.com',
    weeklyClients: 28,
    dailyChatHours: 3,
    calculatedTimeSavedMonthlyHours: 72,
    monthlyNoShows: 5,
    averageTicket: 200,
    calculatedRevenueRecoveredMonthly: 1000,
    biggestPainPoint: 'Clientes que somem ou desmarcam 30 minutos antes do atendimento',
  },
];

export default function App() {
  const [leads, setLeads] = useState<CapturedLead[]>(() => {
    try {
      const saved = localStorage.getItem(BRAND.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to demo leads
    }
    return INITIAL_DEMO_LEADS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlansSheetOpen, setIsPlansSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const hasAutoPoppedRef = useRef(false);
  const dwellElapsedRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(BRAND.storageKey, JSON.stringify(leads));
    } catch (err) {
      console.error('Error saving leads:', err);
    }
  }, [leads]);

  useEffect(() => {
    const dwellTimer = setTimeout(() => {
      dwellElapsedRef.current = true;
    }, 10000);

    const handleScroll = () => {
      if (
        !hasAutoPoppedRef.current &&
        dwellElapsedRef.current &&
        window.innerWidth < 768 &&
        window.scrollY > 320 &&
        !isAdminOpen
      ) {
        const pricingEl = document.getElementById('planos');
        const pricingRect = pricingEl?.getBoundingClientRect();
        const alreadyViewingPricing =
          pricingRect && pricingRect.top < window.innerHeight && pricingRect.bottom > 0;

        if (!alreadyViewingPricing) {
          hasAutoPoppedRef.current = true;
          setIsPlansSheetOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(dwellTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAdminOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleLeadCaptured = (newLead: CapturedLead) => {
    setLeads((prev) => [newLead, ...prev]);
    sendLead(newLead);
    showToast('Diagnóstico recebido com sucesso! O resumo foi preparado.');
  };

  const handleClearLeads = () => {
    if (window.confirm('Deseja limpar todos os leads e diagnósticos salvos?')) {
      setLeads([]);
      localStorage.removeItem(BRAND.storageKey);
      showToast('Dados limpos com sucesso.');
    }
  };

  const openWhatsAppDemo = () => {
    window.open(
      buildWhatsAppUrl('Oi! Quero ver uma demonstração do sistema de agendamento.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const openWhatsAppPlan = (plan: SubscriptionPlan, cycle: 'monthly' | 'annual') => {
    window.open(
      buildWhatsAppUrl(
        `Oi! Quero ver uma demonstração do sistema de agendamento e tenho interesse no plano ${plan.name} (${cycle === 'annual' ? 'anual' : 'mensal'}).`
      ),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const scrollToDiagnostic = () => {
    const el = document.getElementById('diagnostico');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPlans = () => {
    const el = document.getElementById('planos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPlansAction = () => {
    if (window.innerWidth < 1024) {
      setIsPlansSheetOpen(true);
    } else {
      scrollToPlans();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FFF9FB] text-[#2D1B22] flex flex-col font-sans pb-16 md:pb-0">
        {/* Toast feedback notification */}
        {toastMessage && (
          <div className="fixed top-20 md:top-24 right-4 z-50 bg-[#2B1820] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs border border-[#4A2B37]">
            <CheckCircle className="w-4 h-4 text-[#5B8266]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Bar */}
        <Navbar onOpenDiagnostic={scrollToDiagnostic} onOpenTrial={openWhatsAppDemo} />

        <main className="flex-1">
          {/* Hero Section with Real App Preview */}
          <Hero
            onOpenTrial={openWhatsAppDemo}
            onOpenDiagnostic={scrollToDiagnostic}
            onOpenPlans={handleOpenPlansAction}
          />

          {/* Everyday Pain Points vs Automated Solution */}
          <PainPointsAndSolutions onOpenTrial={openWhatsAppDemo} />

          {/* Real Product Video Demo & 3 Steps */}
          <AppVideoDemo onOpenTrial={openWhatsAppDemo} />

          {/* Live Interactive White-Label Demo & Studio Logo Customizer */}
          <WhiteLabelDemo onOpenTrial={openWhatsAppDemo} />

          {/* Interactive Routine Diagnostic Tool & Lead Capture */}
          <RoutineDiagnostic onLeadCaptured={handleLeadCaptured} />

          {/* Subscription Plans & Pricing Table */}
          <PricingSection onSelectPlan={openWhatsAppPlan} />

          {/* Frequently Asked Questions */}
          <FAQ />
        </main>

        {/* Footer with Developer/Admin Lead viewer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} leadsCount={leads.length} />

        {/* Mobile Compact Plans Pop-Up Trigger */}
        <motion.button
          type="button"
          onClick={() => setIsPlansSheetOpen(true)}
          initial={{ y: 36, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 360, damping: 18, delay: 0.25 }}
          className="md:hidden fixed bottom-3 left-3 z-40 h-11 px-4 rounded-full bg-[#2B1820] text-white border border-[#B83B66] shadow-xl flex items-center gap-2 text-xs font-semibold whitespace-nowrap shrink-0"
        >
          <Gem className="w-3.5 h-3.5 text-[#F7D6E2]" />
          <span>Ver Planos · R$ 39,90</span>
        </motion.button>

        {/* Floating WhatsApp Action Button */}
        <a
          href={buildWhatsAppUrl(
            'Oi! Vi a página do LashCore App e quero saber mais sobre o sistema de agendamento com logo próprio para Lash Designers.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-40 h-11 w-11 md:h-auto md:w-auto md:p-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center group"
        >
          <img
            src="/assets/WhatsApp-icon.png"
            alt=""
            width={32}
            height={32}
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
          <span className="hidden md:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
            Dúvidas? Fale no WhatsApp
          </span>
        </a>

        {/* Spring-Animated Mobile Plans Pop-Up Sheet */}
        <MobilePlansSheet
          isOpen={isPlansSheetOpen}
          onClose={() => setIsPlansSheetOpen(false)}
          onSelectPlan={openWhatsAppPlan}
          onScrollToFullTable={scrollToPlans}
        />

        {/* Admin Leads & Survey Data Modal */}
        <AdminLeadsModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          leads={leads}
          onClearLeads={handleClearLeads}
        />
      </div>
    </MotionConfig>
  );
}
