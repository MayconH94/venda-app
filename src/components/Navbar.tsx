import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../config/brand';

interface NavbarProps {
  onOpenDiagnostic: () => void;
  onOpenTrial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDiagnostic, onOpenTrial }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9FB]/90 backdrop-blur-md border-b border-[#F2DCE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="font-serif text-3xl font-bold italic tracking-tight text-[#B83B66] hover:text-[#962A50] transition-colors whitespace-nowrap shrink-0 flex items-baseline gap-1.5"
        >
          <span>{BRAND.name}</span>
          <span className="font-sans not-italic text-[10px] font-semibold uppercase tracking-widest text-[#6B4F59]">
            App
          </span>
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B4F59]">
          <a href="#como-funciona" className="hover:text-[#2D1B22] transition-colors whitespace-nowrap shrink-0">
            Como Funciona
          </a>
          <a href="#demo" className="hover:text-[#2D1B22] transition-colors whitespace-nowrap shrink-0">
            Ver App
          </a>
          <a href="#personalizador-marca" className="hover:text-[#2D1B22] transition-colors whitespace-nowrap shrink-0">
            Seu Logo & Cores
          </a>
          <a href="#diagnostico" className="hover:text-[#962A50] transition-colors whitespace-nowrap shrink-0 text-[#B83B66] font-semibold">
            Diagnóstico
          </a>
          <a href="#planos" className="hover:text-[#2D1B22] transition-colors whitespace-nowrap shrink-0">
            Planos
          </a>
          <a href="#faq" className="hover:text-[#2D1B22] transition-colors whitespace-nowrap shrink-0">
            Dúvidas
          </a>
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenTrial}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83B66] hover:bg-[#962A50] rounded-full transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            Começar 7 Dias Grátis
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="p-2 text-[#6B4F59] hover:text-[#2D1B22] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#F2DCE4] bg-[#FFF9FB] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#6B4F59] hover:text-[#2D1B22] py-1.5"
          >
            Como Funciona
          </a>
          <a
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#6B4F59] hover:text-[#2D1B22] py-1.5"
          >
            Veja o App em Ação (Vídeo)
          </a>
          <a
            href="#personalizador-marca"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#6B4F59] hover:text-[#2D1B22] py-1.5"
          >
            Seu Logo & Cores (Simulador)
          </a>
          <a
            href="#diagnostico"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDiagnostic();
            }}
            className="block text-sm font-semibold text-[#B83B66] hover:text-[#962A50] py-1.5"
          >
            Diagnóstico da Rotina (Grátis)
          </a>
          <a
            href="#planos"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#6B4F59] hover:text-[#2D1B22] py-1.5"
          >
            Planos de Assinatura
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#6B4F59] hover:text-[#2D1B22] py-1.5"
          >
            Perguntas Frequentes
          </a>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83B66] rounded-full"
            >
              Começar 7 Dias Grátis
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
