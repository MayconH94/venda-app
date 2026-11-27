import React, { useState } from 'react';
import {
  Calculator,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Send,
  PhoneCall,
} from 'lucide-react';
import { CapturedLead } from '../types';
import { BRAND, buildWhatsAppUrl } from '../config/brand';

interface RoutineDiagnosticProps {
  onLeadCaptured: (lead: CapturedLead) => void;
  onOpenTrial: () => void;
}

const COMMON_PAINS = [
  'Mensagens tarde da noite e nos finais de semana perguntando "tem horário?"',
  'Clientes que somem ou desmarcam 30 minutos antes do atendimento',
  'Agenda desorganizada, sem pausa para higienizar os materiais ou almoçar',
  'Clientes demorando para voltar (manutenção, retoque, reaplicação) e perdendo retenção',
  'Dificuldade de controlar quanto faturou no final do mês',
];

export const RoutineDiagnostic: React.FC<RoutineDiagnosticProps> = ({ onLeadCaptured, onOpenTrial }) => {
  const [weeklyClients, setWeeklyClients] = useState<number>(18);
  const [dailyChatHours, setDailyChatHours] = useState<number>(2);
  const [monthlyNoShows, setMonthlyNoShows] = useState<number>(3);
  const [averageTicket, setAverageTicket] = useState<number>(180);
  const [biggestPainPoint, setBiggestPainPoint] = useState<string>(COMMON_PAINS[0]);

  const [designerName, setDesignerName] = useState('');
  const [studioName, setStudioName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const monthlyHoursWasted = dailyChatHours * 24;
  const monthlyMoneyLost = monthlyNoShows * averageTicket;
  const yearlyLostRevenue = monthlyMoneyLost * 12;
  const timeRecoveredWeekly = Math.round(dailyChatHours * 5.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designerName || !whatsapp) return;

    const newLead: CapturedLead = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      weeklyClients,
      dailyChatHours,
      monthlyNoShows,
      averageTicket,
      biggestPainPoint,
      designerName,
      studioName: studioName || designerName,
      whatsapp,
      instagram,
      email,
      calculatedTimeSavedMonthlyHours: monthlyHoursWasted,
      calculatedRevenueRecoveredMonthly: monthlyMoneyLost,
    };

    onLeadCaptured(newLead);
    setIsSubmitted(true);
  };

  const getWhatsAppShareLink = () => {
    return buildWhatsAppUrl(
      `Olá! Fiz o diagnóstico da minha rotina de profissional da beleza no ${BRAND.name}:\n` +
        `✨ Estúdio: ${studioName || designerName}\n` +
        `⏱️ Tempo gasto no WhatsApp: ${dailyChatHours}h/dia (${monthlyHoursWasted}h/mês)\n` +
        `💸 Prejuízo mensal com faltas: R$ ${monthlyMoneyLost},00\n` +
        `🎯 Maior dor: ${biggestPainPoint}\n` +
        `🎁 Quero testar 7 dias grátis com a minha marca\n\n` +
        `Gostaria de ver uma demonstração com logo próprio e tirar dúvidas!`
    );
  };

  return (
    <section id="diagnostico" className="py-16 md:py-24 bg-[#FFF9FB] border-b border-[#F2DCE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B83B66]">
            <Calculator className="w-4 h-4 text-[#B83B66]" />
            <span>Ferramenta Interativa de Diagnóstico</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2D1B22] tracking-tight leading-tight">
            Descubra quanto tempo e dinheiro você <br className="hidden sm:inline" />
            <span className="font-semibold italic text-[#B83B66]">
              está perdendo no WhatsApp todos os meses
            </span>
          </h2>
          <p className="text-base text-[#6B4F59]">
            Responda 4 perguntas rápidas e veja em tempo real o impacto que um sistema automatizado com a sua marca causa na sua rotina e no seu faturamento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Inputs & Questions */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#F2DCE4] shadow-xs space-y-7">
            <h3 className="font-serif text-2xl font-bold text-[#2D1B22] border-b border-[#F2DCE4] pb-3">
              Sua Rotina Atual de Atendimentos
            </h3>

            {/* Question 1 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs gap-2">
                <label htmlFor="q-clientes" className="font-bold uppercase tracking-wider text-[#4E353F]">
                  1. Quantas clientes você atende por semana?
                </label>
                <span className="font-serif font-bold text-lg text-[#B83B66] tabular-nums shrink-0">
                  {weeklyClients} clientes
                </span>
              </div>
              <input
                id="q-clientes"
                type="range"
                min="5"
                max="50"
                step="1"
                value={weeklyClients}
                aria-valuetext={`${weeklyClients} clientes por semana`}
                onChange={(e) => setWeeklyClients(Number(e.target.value))}
                className="w-full accent-[#B83B66] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#7D606B]">
                <span>Iniciante (5/sem)</span>
                <span>Agenda Cheia (25/sem)</span>
                <span>Agenda lotada (50+/sem)</span>
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs gap-2">
                <label htmlFor="q-chat" className="font-bold uppercase tracking-wider text-[#4E353F]">
                  2. Quanto tempo você passa por dia no WhatsApp negociando horários?
                </label>
                <span className="font-serif font-bold text-lg text-[#B83B66] tabular-nums shrink-0">
                  {dailyChatHours} {dailyChatHours === 1 ? 'hora' : 'horas'}/dia
                </span>
              </div>
              <input
                id="q-chat"
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={dailyChatHours}
                aria-valuetext={`${dailyChatHours} horas por dia`}
                onChange={(e) => setDailyChatHours(Number(e.target.value))}
                className="w-full accent-[#B83B66] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#7D606B]">
                <span>30 min (rápido)</span>
                <span>2 horas (pausas e à noite)</span>
                <span>4 horas (caos constante)</span>
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs gap-2">
                <label htmlFor="q-faltas" className="font-bold uppercase tracking-wider text-[#4E353F]">
                  3. Quantas faltas ou cancelamentos em cima da hora acontecem por mês?
                </label>
                <span className="font-serif font-bold text-lg text-[#B3404A] tabular-nums shrink-0">
                  {monthlyNoShows} {monthlyNoShows === 1 ? 'falta' : 'faltas'}/mês
                </span>
              </div>
              <input
                id="q-faltas"
                type="range"
                min="0"
                max="10"
                step="1"
                value={monthlyNoShows}
                aria-valuetext={`${monthlyNoShows} faltas por mês`}
                onChange={(e) => setMonthlyNoShows(Number(e.target.value))}
                className="w-full accent-[#B83B66] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#7D606B]">
                <span>Nenhuma (raro)</span>
                <span>3 a 4 faltas (comum)</span>
                <span>8+ faltas (prejuízo grave)</span>
              </div>
            </div>

            {/* Question 4 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs gap-2">
                <label htmlFor="q-ticket" className="font-bold uppercase tracking-wider text-[#4E353F]">
                  4. Qual o valor médio do serviço que você mais faz?
                </label>
                <span className="font-serif font-bold text-lg text-[#3E7051] tabular-nums shrink-0">
                  R$ {averageTicket},00
                </span>
              </div>
              <input
                id="q-ticket"
                type="range"
                min="80"
                max="350"
                step="10"
                value={averageTicket}
                aria-valuetext={`${averageTicket} reais`}
                onChange={(e) => setAverageTicket(Number(e.target.value))}
                className="w-full accent-[#B83B66] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#7D606B]">
                <span>R$ 80 (serviço rápido)</span>
                <span>R$ 180 (médio padrão)</span>
                <span>R$ 350 (alto padrão)</span>
              </div>
            </div>

            {/* Question 5 */}
            <div className="space-y-2 pt-2 border-t border-[#F2DCE4]">
              <span id="q-dor" className="block text-xs font-bold uppercase tracking-wider text-[#4E353F]">
                5. Qual é o maior estresse na sua rotina hoje?
              </span>
              <div className="space-y-2" role="radiogroup" aria-labelledby="q-dor">
                {COMMON_PAINS.map((pain) => (
                  <label
                    key={pain}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                      biggestPainPoint === pain
                        ? 'border-[#B83B66] bg-[#FDF2F6] text-[#2D1B22] font-medium'
                        : 'border-[#F2DCE4] hover:bg-[#FFF9FB] text-[#6B4F59]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="painPoint"
                      checked={biggestPainPoint === pain}
                      onChange={() => setBiggestPainPoint(pain)}
                      className="mt-0.5 h-4 w-4 accent-[#B83B66]"
                    />
                    <span>{pain}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results & Lead Capture */}
          <div className="lg:col-span-5 space-y-6">
            {/* The Results Card */}
            <div className="bg-[#2B1820] text-white p-6 sm:p-7 rounded-2xl shadow-xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#B83B66]/35 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#F7D6E2]">
                  Resultado do seu Diagnóstico
                </span>
                <span className="text-[11px] bg-[#B83B66] px-2 py-0.5 rounded text-white font-medium">
                  Tempo Real
                </span>
              </div>

              {/* Metric 1 */}
              <div className="space-y-1">
                <span className="text-xs text-[#DFC4CE] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F7D6E2]" />
                  Tempo perdido digitando no WhatsApp:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-white tabular-nums">
                    {monthlyHoursWasted} horas
                  </span>
                  <span className="text-xs text-[#F7D6E2]">/ mês</span>
                </div>
                <p className="text-[11px] text-[#C6A9B4]">
                  Equivale a <strong>{Math.round(monthlyHoursWasted / 2)} atendimentos inteiros</strong> que você poderia estar faturando ou descansando com sua família.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1 pt-3 border-t border-white/10">
                <span className="text-xs text-[#DFC4CE] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#FFB4C4]" />
                  Prejuízo com faltas e buracos na agenda:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#FFB4C4] tabular-nums">
                    R$ {monthlyMoneyLost.toLocaleString('pt-BR')},00
                  </span>
                  <span className="text-xs text-[#F7D6E2]">/ mês</span>
                </div>
                <p className="text-[11px] text-[#C6A9B4]">
                  Em 1 ano, você deixa na mesa{' '}
                  <strong className="text-white">
                    R$ {yearlyLostRevenue.toLocaleString('pt-BR')},00
                  </strong>{' '}
                  por faltas e por mensagens que ficam sem resposta (estimativa).
                </p>
              </div>

              {/* Metric 3 */}
              <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
                <div className="text-xs font-bold text-[#F7D6E2] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#7BD499]" />
                  Com o {BRAND.name} White-Label:
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  Estimativa: até <strong>{timeRecoveredWeekly} horas livres toda semana</strong>, com a cliente agendando sozinha e o lembrete pronto para confirmar no WhatsApp.
                </p>
              </div>
            </div>

            {/* Lead Capture Box */}
            <div className="bg-white p-6 rounded-2xl border border-[#F2DCE4] shadow-xs">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#2D1B22]">
                      Quer resolver isso e testar com seu logotipo?
                    </h4>
                    <p className="text-xs text-[#6B4F59] mt-0.5">
                      Deixe seu contato para receber o resumo no WhatsApp e comece{' '}
                      <strong>7 dias grátis</strong>, sem cartão:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="diag-nome" className="block text-[11px] font-bold uppercase tracking-wider text-[#6B4F59] mb-1">
                          Seu Nome *
                        </label>
                        <input
                          type="text"
                          required
                          id="diag-nome" autoComplete="name" value={designerName}
                          onChange={(e) => setDesignerName(e.target.value)}
                          placeholder="Ex: Ana Paula"
                          className="w-full text-xs p-2.5 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="diag-studio" className="block text-[11px] font-bold uppercase tracking-wider text-[#6B4F59] mb-1">
                          Nome do Estúdio
                        </label>
                        <input
                          type="text"
                          id="diag-studio" autoComplete="organization" value={studioName}
                          onChange={(e) => setStudioName(e.target.value)}
                          placeholder="Ex: Studio Ana Bela"
                          className="w-full text-xs p-2.5 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="diag-whats" className="block text-[11px] font-bold uppercase tracking-wider text-[#6B4F59] mb-1">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="tel"
                          required
                          id="diag-whats" autoComplete="tel" value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="(31) 99220-0095"
                          className="w-full text-xs p-2.5 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="diag-insta" className="block text-[11px] font-bold uppercase tracking-wider text-[#6B4F59] mb-1">
                          Instagram do Estúdio
                        </label>
                        <input
                          type="text"
                          id="diag-insta" autoComplete="off" value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="@studio.anabela"
                          className="w-full text-xs p-2.5 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="diag-email" className="block text-[11px] font-bold uppercase tracking-wider text-[#6B4F59] mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="diag-email" autoComplete="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ana@email.com"
                        className="w-full text-xs p-2.5 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83B66] hover:bg-[#962A50] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Salvar Diagnóstico</span>
                  </button>

                  <p className="text-[10px] text-center text-[#7D606B]">
                    Ao enviar, você autoriza o contato pelo WhatsApp sobre o BelaCore. Prometemos zero spam, e você pode pedir a exclusão dos dados a qualquer momento.
                  </p>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4" role="status">
                  <div className="w-12 h-12 rounded-full bg-[#EBF4EE] text-[#3E7051] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-[#2D1B22]">
                      Diagnóstico Salvo com Sucesso!
                    </h4>
                    <p className="text-xs text-[#6B4F59] mt-1 leading-relaxed">
                      Olá <strong>{designerName}</strong>! Seu diagnóstico foi registrado no{' '}
                      <strong>{BRAND.name}</strong>.
                    </p>
                  </div>

                  <div className="p-3 bg-[#FFF9FB] rounded-xl text-left text-xs border border-[#F2DCE4] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#6B4F59]">Horas mensais recuperáveis:</span>
                      <strong className="text-[#B83B66] font-bold">{monthlyHoursWasted} horas</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B4F59]">Faturamento recuperável:</span>
                      <strong className="text-[#3E7051] font-bold">
                        R$ {monthlyMoneyLost.toLocaleString('pt-BR')},00/mês
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B4F59]">Para começar:</span>
                      <strong className="text-[#2D1B22]">7 dias grátis, sem cartão</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenTrial}
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#B83B66] hover:bg-[#962A50] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Quero meus 7 dias grátis</span>
                  </button>

                  <a
                    href={getWhatsAppShareLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#14532D] bg-[#BBF7D0] hover:bg-[#86EFAC] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Enviar Resumo no WhatsApp Agora</span><span className="sr-only"> (abre em nova aba)</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#B83B66] hover:underline block mx-auto"
                  >
                    Refazer com outros números
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
