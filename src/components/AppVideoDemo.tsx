import React from 'react';
import { Play, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

interface AppVideoDemoProps {
  onOpenTrial: () => void;
}

const STEPS = [
  {
    number: '01',
    title: 'Você cadastra seus serviços',
    description:
      'Adicione nome, preço, duração e foto de cada procedimento (Volume Russo, Fio a Fio, Brow Lamination) e defina seus horários de atendimento e folgas.',
  },
  {
    number: '02',
    title: 'Divulga o seu link exclusivo',
    description:
      'Coloque o link na bio do Instagram, nos destaques ou na resposta automática do WhatsApp. A cliente acessa direto no navegador, sem baixar nada.',
  },
  {
    number: '03',
    title: 'A cliente agenda sozinha',
    description:
      'Ela visualiza apenas os horários realmente livres, escolhe o serviço, confirma com nome e telefone, e tudo aparece organizado na sua agenda do dia.',
  },
];

export const AppVideoDemo: React.FC<AppVideoDemoProps> = ({ onOpenTrial }) => {
  return (
    <section id="demo" className="py-16 md:py-24 bg-[#FDF2F6] border-b border-[#F2DCE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Real App Video */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[330px] bg-[#24131A] p-3 rounded-[40px] shadow-2xl border-4 border-[#4A2B37]">
              <div className="w-24 h-3.5 bg-[#24131A] rounded-b-xl mx-auto mb-1.5 flex items-center justify-center">
                <div className="w-8 h-1 bg-[#4A2B37] rounded-full" />
              </div>
              <div className="rounded-[28px] overflow-hidden bg-black">
                <video
                  className="w-full h-auto block"
                  src="/assets/demo.mp4"
                  poster="/assets/poster.jpg"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
          </div>

          {/* Right: 3 Simple Steps & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B83B66]">
                <Play className="w-4 h-4 text-[#B83B66]" />
                <span>Veja o {BRAND.name} em Ação</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2D1B22] tracking-tight leading-tight">
                Simples para você gerenciar,{' '}
                <span className="font-semibold italic text-[#B83B66]">
                  irresistível para a sua cliente agendar.
                </span>
              </h2>
              <p className="text-base text-[#6B4F59] leading-relaxed">
                Aperte o play ao lado para ver o aplicativo funcionando na prática. Em apenas 3 passos você coloca sua agenda para trabalhar no automático:
              </p>
            </div>

            <ol className="space-y-4">
              {STEPS.map((step) => (
                <li
                  key={step.number}
                  className="bg-white p-5 rounded-2xl border border-[#F2DCE4] shadow-xs flex items-start gap-4"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#FDF2F6] border border-[#F2DCE4] text-[#B83B66] font-serif font-bold text-lg flex items-center justify-center shrink-0">
                    {step.number}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-bold text-[#2D1B22]">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6B4F59] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenTrial}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83B66] hover:bg-[#962A50] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Testar 7 dias grátis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={buildWhatsAppUrl(
                  'Oi! Vi o vídeo do LashCore App e quero saber mais sobre o agendamento para Lash Designers.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#2D1B22] bg-white hover:bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Tirar Dúvidas no WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#6B4F59]">
              <CheckCircle2 className="w-4 h-4 text-[#5B8266] shrink-0" />
              <span>
                No Plano Pro, nós fazemos a configuração inicial dos seus serviços, fotos e horários junto com você.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
