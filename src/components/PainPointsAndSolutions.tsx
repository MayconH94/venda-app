import React from 'react';
import {
  Eye,
  Crown,
  CheckCircle2,
  XCircle,
  Clock,
  Smartphone,
  CalendarCheck,
  BellRing,
} from 'lucide-react';
import { BRAND } from '../config/brand';

interface PainPointsProps {
  onOpenTrial: () => void;
}

export const PainPointsAndSolutions: React.FC<PainPointsProps> = ({ onOpenTrial }) => {
  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-[#FFF9FB] border-b border-[#F2DCE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B83B66]">
            <Eye className="w-4 h-4 text-[#B83B66]" />
            <span>Feito para a rotina de maca e pinça</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2D1B22] tracking-tight leading-tight">
            Você se especializou para ser Lash Designer, <br className="hidden sm:inline" />
            <span className="font-semibold italic text-[#B83B66]">
              não para ser recepcionista 24 horas por dia.
            </span>
          </h2>
          <p className="text-base text-[#6B4F59]">
            Veja a diferença entre a rotina desgastante no WhatsApp e o padrão de organização que o {BRAND.name} entrega para o seu estúdio:
          </p>
        </div>

        {/* Contrast Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: Rotina Antiga (Dor) */}
          <div className="bg-white p-7 sm:p-9 rounded-2xl border border-[#F0D5DB] shadow-xs space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#F6E2E7] pb-4">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3404A]">
                <XCircle className="w-5 h-5 text-[#B3404A]" />
                <span>Sua rotina hoje (Sem Sistema)</span>
              </div>
              <span className="text-[11px] font-medium text-[#B3404A] bg-[#FDF0EE] px-2.5 py-0.5 rounded-full">
                Estresse & Furos
              </span>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-[#6B4F59]">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B3404A] mt-2 shrink-0" />
                <span>
                  <strong>Perder a noite de domingo:</strong> Digitando listas enormes de horários vagos que já mudaram 10 minutos depois.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B3404A] mt-2 shrink-0" />
                <span>
                  <strong>Prejuízo do "bolo":</strong> A cliente falta na aplicação de Volume Russo de 2h, você fica com a maca parada e sem conseguir encaixar outra pessoa.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B3404A] mt-2 shrink-0" />
                <span>
                  <strong>Interromper o atendimento:</strong> Celular tocando sem parar enquanto você precisa de foco total no isolamento dos fios.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B3404A] mt-2 shrink-0" />
                <span>
                  <strong>Clientes que passam do prazo da manutenção:</strong> Sem lembrete de 15 a 21 dias, a cliente volta com menos de 30% dos fios esperando preço de manutenção.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B3404A] mt-2 shrink-0" />
                <span>
                  <strong>Sem pausa para almoço ou higienização:</strong> Atendimentos encavalados sem intervalo para esterilizar pinças, trocar o lençol e descansar as costas.
                </span>
              </li>
            </ul>
          </div>

          {/* Card: Rotina com LashCore (Solução) */}
          <div className="bg-white p-7 sm:p-9 rounded-2xl border border-[#C5DDD0] shadow-sm space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#D5EADB] pb-4">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#3E7051]">
                <CheckCircle2 className="w-5 h-5 text-[#3E7051]" />
                <span>Sua rotina com o {BRAND.name} White-Label</span>
              </div>
              <span className="text-[11px] font-semibold text-[#3E7051] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
                Paz & Lucratividade
              </span>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-[#2B231D]">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E7051] mt-2 shrink-0" />
                <span>
                  <strong>Link na Bio do Instagram e WhatsApp:</strong> A cliente vê seu catálogo com fotos, preços e durações reais e agenda sozinha em 30 segundos.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E7051] mt-2 shrink-0" />
                <span>
                  <strong>Sinal Pix Anti-Falta (em breve):</strong> Estamos preparando o sinal antecipado para proteger seus horários.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E7051] mt-2 shrink-0" />
                <span>
                  <strong>Lembrete em 1 toque no WhatsApp:</strong> Na agenda, um botão abre a conversa com a mensagem pronta confirmando o horário. É só enviar.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E7051] mt-2 shrink-0" />
                <span>
                  <strong>Alerta Inteligente de Retorno:</strong> O app mostra quem chegou na janela de 15 a 21 dias da manutenção e deixa a mensagem pronta com 1 toque.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E7051] mt-2 shrink-0" />
                <span>
                  <strong>Seus Horários, Folgas e Intervalos:</strong> Defina seu expediente semanal, bloqueie folgas e garanta pausa automática entre cada cliente.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3 Marquee Pillar Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl border border-[#F2DCE4] overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="p-6 sm:p-7 space-y-3">
              <span className="text-xs font-serif font-bold text-[#B83B66]">
                01. Exclusividade White-Label
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2D1B22]">
                Seu Logotipo & Cores em Destaque
              </h3>
              <p className="text-xs text-[#6B4F59] leading-relaxed">
                O link é no seu nome, o cabeçalho exibe a marca do seu estúdio e a cliente vive uma experiência premium do início ao fim, sem anúncios ou nomes de concorrentes.
              </p>
            </div>
            <div className="px-6 pb-6 pt-0">
              <div className="p-3.5 bg-[#FDF2F6] rounded-xl border border-[#F2DCE4] flex items-center gap-3">
                <Crown className="w-6 h-6 text-[#B83B66] shrink-0" />
                <span className="text-[11px] text-[#5C424B] font-medium">
                  Upload de logo próprio, paleta personalizada e link {BRAND.domain}/seustudio.
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl border border-[#F2DCE4] overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="p-6 sm:p-7 space-y-3">
              <span className="text-xs font-serif font-bold text-[#B83B66]">
                02. Alta Precisão de Agenda
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2D1B22]">
                Tempos Reais por Procedimento
              </h3>
              <p className="text-xs text-[#6B4F59] leading-relaxed">
                Aplicação de Volume Russo não tem a mesma duração de uma manutenção ou Brow Lamination. Configure fotos, preços e durações reais para cada serviço.
              </p>
            </div>
            <div className="px-6 pb-6 pt-0 space-y-2">
              <div className="p-3 bg-[#FDF2F6] rounded-xl border border-[#F2DCE4] space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2D1B22] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B83B66]" /> Volume Russo
                  </span>
                  <span className="text-[#6B4F59] font-mono">2h 00min · R$ 200</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#F2DCE4] pt-1.5">
                  <span className="font-semibold text-[#2D1B22] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B83B66]" /> Manutenção (21 dias)
                  </span>
                  <span className="text-[#6B4F59] font-mono">1h 15min · R$ 110</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#F2DCE4] pt-1.5">
                  <span className="font-semibold text-[#2D1B22] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B83B66]" /> Brow Lamination
                  </span>
                  <span className="text-[#6B4F59] font-mono">1h 30min · R$ 250</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl border border-[#F2DCE4] overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="p-6 sm:p-7 space-y-3">
              <span className="text-xs font-serif font-bold text-[#B83B66]">
                03. Controle na Palma da Mão
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2D1B22]">
                Agenda do Dia & Retornos
              </h3>
              <p className="text-xs text-[#6B4F59] leading-relaxed">
                Veja os atendimentos do dia, cancele, bloqueie horários e chame qualquer cliente no WhatsApp com mensagem pronta de confirmação ou manutenção em 1 toque.
              </p>
            </div>
            <div className="px-6 pb-6 pt-0 space-y-2">
              <div className="p-3 bg-[#FDF2F6] rounded-xl border border-[#F2DCE4] space-y-2 text-[11px]">
                <div className="flex items-center gap-2 text-[#2D1B22] font-medium">
                  <Smartphone className="w-4 h-4 text-[#B83B66] shrink-0" />
                  <span>100% otimizado para o celular</span>
                </div>
                <div className="flex items-center gap-2 text-[#2D1B22] font-medium">
                  <CalendarCheck className="w-4 h-4 text-[#5B8266] shrink-0" />
                  <span>Expediente semanal e bloqueio de folgas</span>
                </div>
                <div className="flex items-center gap-2 text-[#2D1B22] font-medium">
                  <BellRing className="w-4 h-4 text-[#B83B66] shrink-0" />
                  <span>Alerta de clientes na hora da manutenção</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section bottom CTA */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onOpenTrial}
            className="px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83B66] hover:bg-[#962A50] rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <span>Quero Ver uma Demonstração</span>
          </button>
        </div>
      </div>
    </section>
  );
};
