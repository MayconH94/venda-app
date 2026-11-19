import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../config/brand';

const TESTIMONIALS = [
  {
    name: 'Camila Vasconcelos',
    role: 'Lash Designer · Especialista em Volume Russo',
    studio: 'Studio Camila Lash · Belo Horizonte, MG',
    initials: 'CV',
    quote:
      'Eu perdia pelo menos duas horas toda noite respondendo "tem horário?" no WhatsApp. Quando coloquei o link do LashCore na bio com meu logotipo e o sinal Pix de R$ 30, os furos na maca simplesmente zeraram. Hoje fecho os sábados com 2 semanas de antecedência.',
    outcome: '+R$ 1.600 recuperados no 1º mês e zero faltas',
  },
  {
    name: 'Larissa Meireles',
    role: 'Master Lash & Brow Designer',
    studio: 'Ateliê Olhar & Arte · São Paulo, SP',
    initials: 'LM',
    quote:
      'O que mais me encantou foi o White-Label. Eu não gostava de aplicativos genéricos cheios de propaganda. No LashCore, a cliente abre o link e vê a minha marca, minhas fotos de cílios e as cores do meu estúdio. Passa outra autoridade.',
    outcome: 'Autoridade imediata e elogios das clientes',
  },
  {
    name: 'Bruna Sampaio',
    role: 'Especialista em Volume Brasileiro e Lash Lifting',
    studio: 'Bruna Sampaio Studio · Curitiba, PR',
    initials: 'BS',
    quote:
      'O lembrete de retorno para manutenção salvou minha agenda! Antes as clientes passavam dos 25 dias e voltavam quase sem fios. Agora o app avisa quem está na hora da manutenção e já deixa a mensagem pronta no WhatsApp.',
    outcome: 'Taxa de retorno de manutenção subiu de 45% para 85%',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFF9FB] border-b border-[#F2DCE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#B83B66]">
            <Quote className="w-4 h-4 text-[#B83B66]" />
            <span>Quem Usa o {BRAND.name} na Prática</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2D1B22] tracking-tight leading-tight">
            Lash Designers que trocaram a correria do WhatsApp <br className="hidden sm:inline" />
            <span className="font-semibold italic text-[#B83B66]">
              por um estúdio organizado e elegante.
            </span>
          </h2>
          <p className="text-base text-[#6B4F59]">
            Histórias de profissionais que recuperaram a paz nas noites e finais de semana:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-7 sm:p-8 rounded-2xl border border-[#F2DCE4] shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#C48B47]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#4E353F] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#F7E8EE]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#3E7051] bg-[#EAF5EE] px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.outcome}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FDF2F6] border border-[#F2DCE4] text-[#B83B66] font-serif font-bold italic text-base flex items-center justify-center shrink-0">
                    {t.initials}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-[#2D1B22] truncate">{t.name}</h4>
                    <p className="text-[11px] text-[#6B4F59] truncate">{t.role}</p>
                    <p className="text-[10px] text-[#8E6F7B] truncate">{t.studio}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
