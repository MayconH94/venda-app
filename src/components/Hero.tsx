import React from 'react';
import { ArrowRight, CheckCircle2, Eye, Clock, ShieldCheck, PlayCircle } from 'lucide-react';

interface HeroProps {
  onOpenTrial: () => void;
  onOpenDiagnostic: () => void;
  onOpenPlans: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial, onOpenDiagnostic, onOpenPlans }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#F2DCE4] bg-gradient-to-b from-[#FDF2F6] via-[#FFF9FB] to-[#FFF9FB]">
      {/* Subtle ambient blush backdrop glow */}
      <div
        className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#FADCE8] rounded-full blur-3xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 left-10 -z-10 w-80 h-80 bg-[#F7D6E2] rounded-full blur-3xl opacity-45 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F2DCE4] shadow-2xs text-[11px] font-semibold tracking-wider uppercase text-[#B83B66]">
              <Eye className="w-3.5 h-3.5 text-[#B83B66]" />
              <span>Sistema White-Label para Profissionais da Beleza</span>
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[3.75rem] font-bold text-[#2D1B22] tracking-tight leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Sua agenda online sem passar o dia respondendo{' '}
              <span className="italic font-semibold text-[#B83B66]">"tem horário?"</span>
            </h1>

            <p className="text-base sm:text-lg text-[#6B4F59] leading-relaxed max-w-2xl">
              Um app por assinatura com o seu link para a bio do Instagram, seu logotipo e suas cores. Sua cliente escolhe o procedimento e o horário livre em segundos — sem instalar nada — e você só atende.
            </p>

            <ul className="flex flex-wrap items-center gap-2" aria-label="Áreas atendidas">
              {['Cílios', 'Unhas', 'Sobrancelhas', 'Cabelos', 'Estética'].map((area) => (
                <li
                  key={area}
                  className="px-3 py-1 rounded-full bg-white border border-[#F2DCE4] text-xs font-semibold text-[#962A50]"
                >
                  {area}
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenTrial}
                  className="px-7 py-4 text-sm font-semibold tracking-wide uppercase text-white bg-[#B83B66] hover:bg-[#962A50] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Testar 7 dias grátis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenDiagnostic}
                  className="px-6 py-4 text-sm font-semibold text-[#6B4F59] bg-white hover:bg-[#FDF2F6] border border-[#EEDCE3] hover:border-[#B83B66] rounded-xl transition-all text-center flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-[#B83B66]" />
                  <span>Calcular Tempo & Prejuízo Perdido</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <button
                  type="button"
                  onClick={onOpenPlans}
                  className="text-xs font-semibold text-[#B83B66] hover:text-[#962A50] underline underline-offset-4 decoration-[#E9B5C7] transition-colors inline-flex items-center gap-1"
                >
                  <span>Ver planos com seu logotipo (a partir de R$ 39,90/mês)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#demo"
                  className="text-xs font-semibold text-[#6B4F59] hover:text-[#2D1B22] transition-colors inline-flex items-center gap-1.5"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-[#B83B66]" />
                  <span>Assistir demonstração real do app</span>
                </a>
              </div>
            </div>

            {/* Micro-trust proof points */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#6B4F59]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E7051]" />
                <span>Funciona direto do celular</span>
              </div>
              <span className="text-[#DEC5CE] hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E7051]" />
                <span>Sem instalar nada</span>
              </div>
              <span className="text-[#DEC5CE] hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E7051]" />
                <span>Link para bio do Instagram</span>
              </div>
              <span className="text-[#DEC5CE] hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E7051]" />
                <span>Sem necessidade de CNPJ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real BelaCore Mobile App Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[330px]">
              {/* Smartphone Bezel with Real App Screenshot */}
              <div className="bg-[#24131A] p-3 rounded-[40px] shadow-2xl border-4 border-[#4A2B37] relative">
                <div className="w-24 h-3.5 bg-[#24131A] rounded-b-xl mx-auto mb-1.5 flex items-center justify-center">
                  <div className="w-8 h-1 bg-[#4A2B37] rounded-full" />
                </div>

                <div className="rounded-[28px] overflow-hidden bg-[#FDF2F5] relative">
                  <img
                    src="/assets/app-tela-2.png"
                    alt="Tela de agendamento do app BelaCore no celular, com o logotipo e as cores do studio e serviços de cílios, unhas, sobrancelhas e cabelos"
                    className="w-full h-auto block object-cover"
                  />
                </div>
              </div>

              {/* Floating New Booking Notification */}
              <div className="hidden sm:flex absolute -top-4 -left-10 bg-white rounded-xl p-3 shadow-xl border border-[#F2DCE4] items-center gap-3 animate-bounce [animation-duration:3s]">
                <div className="w-8 h-8 rounded-full bg-[#EBF4EE] flex items-center justify-center text-[#3E7051] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2D1B22]">Novo agendamento recebido!</p>
                  <p className="text-[11px] text-[#7D606B]">Unha Balone · R$ 150,00</p>
                </div>
              </div>

              {/* Floating Studio Status Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-right-8 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-[#F2DCE4] shadow-xl text-[#2D1B22] sm:w-64">
                <div className="flex items-center justify-between gap-2 border-b border-[#F7E8EE] pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FDF2F6] border border-[#F2DCE4] flex items-center justify-center font-serif font-bold italic text-sm text-[#B83B66]">
                      SA
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2D1B22]">Studio Ana Bela</div>
                      <div className="text-[10px] text-[#7D606B] font-mono">Seu link na bio</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold text-[#3E7051] bg-[#E8F3EB] px-1.5 py-0.5 rounded">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#3E7051]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Avisos no celular
                  </span>
                  <span className="font-semibold text-[#B83B66]">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Strip Row Below Hero */}
        <div className="mt-16 pt-10 border-t border-[#F2DCE4] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#B83B66] tabular-nums">1 toque</div>
            <div className="text-xs sm:text-sm text-[#6B4F59]">Lembrete pronto para cada cliente</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#B83B66] tabular-nums">Sem chat</div>
            <div className="text-xs sm:text-sm text-[#6B4F59]">Agendamento 24h sem você responder mensagem</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#B83B66] tabular-nums">Sua marca</div>
            <div className="text-xs sm:text-sm text-[#6B4F59]">Sua cor, seu nome, sua logo</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#B83B66] tabular-nums">24h / dia</div>
            <div className="text-xs sm:text-sm text-[#6B4F59]">Clientes agendam enquanto você atende</div>
          </div>
        </div>
      </div>
    </section>
  );
};
