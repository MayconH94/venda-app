import React from 'react';
import { Database, MessageCircle } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

interface FooterProps {
  onOpenAdmin: () => void;
  leadsCount: number;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, leadsCount }) => {
  return (
    <footer className="bg-[#24131A] text-[#F2DCE4] py-14 border-t border-[#422531]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Col 1: Wordmark & Statement */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-serif text-3xl font-bold italic tracking-tight text-white block">
              {BRAND.name}
            </span>
            <p className="text-xs text-[#C6A9B4] max-w-md leading-relaxed">
              O sistema de agendamento online e gestão white-label desenvolvido exclusivamente para valorizar a marca e a rotina das profissionais da beleza brasileiras.
            </p>
            <div className="pt-1 text-[11px] text-[#DFC4CE]">
              <strong className="text-white">{BRAND.name}</strong> · {BRAND.creatorCredit}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Navegação
            </span>
            <ul className="space-y-1.5 text-xs text-[#DFC4CE]">
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-white transition-colors">
                  Veja o App em Ação
                </a>
              </li>
              <li>
                <a href="#personalizador-marca" className="hover:text-white transition-colors">
                  Simulador de Logotipo
                </a>
              </li>
              <li>
                <a href="#diagnostico" className="hover:text-white transition-colors">
                  Diagnóstico de Tempo Perdido
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-white transition-colors">
                  Planos de Assinatura
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Contact */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Fale Conosco
            </span>
            <p className="text-xs text-[#DFC4CE] leading-relaxed">
              Dúvidas sobre a assinatura, personalização do logotipo ou configuração inicial dos seus serviços?
            </p>
            <a
              href={buildWhatsAppUrl(
                'Oi! Quero saber mais sobre o BelaCore App de agendamento para profissionais da beleza.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#F7D6E2] hover:text-white transition-colors pt-1"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chamar no WhatsApp Oficial</span><span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#422531] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A88693]">
          <div className="space-y-1 text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} {BRAND.name} · Todos os direitos reservados.
            </div>
            <div className="text-[11px] text-[#C6A9B4]">
              Usamos seu nome e telefone apenas para falar com você sobre o {BRAND.name}. Não vendemos nem
              compartilhamos seus dados. Para apagar os seus dados, é só pedir pelo WhatsApp.
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 min-h-11 text-[11px] text-[#DFC4CE] hover:text-white bg-[#331B24] px-3 py-1.5 rounded-lg border border-[#4A2B37] transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-[#E99BB3]" />
            <span>Ver Informações Coletadas ({leadsCount} leads)</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
