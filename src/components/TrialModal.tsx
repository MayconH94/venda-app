import React, { useState, useEffect } from 'react';
import { X, Crown, Check, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { SubscriptionPlan, TrialFormData } from '../types';
import { SUBSCRIPTION_PLANS } from '../data/plans';
import { BRAND, buildWhatsAppUrl, slugifyStudio } from '../config/brand';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: SubscriptionPlan | null;
  billingCycle: 'monthly' | 'annual';
  onSuccess: (data: TrialFormData) => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  billingCycle,
  onSuccess,
}) => {
  const [designerName, setDesignerName] = useState('');
  const [studioName, setStudioName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [planChoice, setPlanChoice] = useState(selectedPlan?.id || 'pro');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPlanChoice(selectedPlan?.id || 'pro');
      setSubmitted(false);
    }
  }, [isOpen, selectedPlan]);

  if (!isOpen) return null;

  const chosenPlan = SUBSCRIPTION_PLANS.find((p) => p.id === planChoice) || SUBSCRIPTION_PLANS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designerName || !whatsapp) return;

    const data: TrialFormData = {
      designerName,
      studioName: studioName || designerName,
      whatsapp,
      instagram,
      email,
      planChoice: chosenPlan.name,
      billingCycle,
      createdAt: new Date().toISOString(),
    };

    onSuccess(data);
    setSubmitted(true);
  };

  const whatsappConfirmLink = buildWhatsAppUrl(
    `Olá! Acabei de solicitar meus 7 dias grátis no ${BRAND.name}!\n` +
      `👩‍🎨 Nome: ${designerName}\n` +
      `✨ Estúdio: ${studioName || designerName}\n` +
      `📋 Plano: ${chosenPlan.name} (${billingCycle === 'annual' ? 'Anual' : 'Mensal'})\n` +
      `📱 Instagram: ${instagram || 'Não informado'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#F2DCE4] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#FFF9FB] border-b border-[#F2DCE4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#B83B66] text-white flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#2D1B22]">
                Comece seu Teste Grátis de 7 Dias
              </h3>
              <p className="text-[11px] text-[#6B4F59]">Sem cartão de crédito · Sem compromisso</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-[#FDF2F6] rounded-xl border border-[#F2DCE4] text-xs text-[#962A50] flex items-center justify-between gap-2">
                <span>
                  Plano Selecionado: <strong>{chosenPlan.name}</strong>
                </span>
                <span className="font-bold text-[#B83B66] shrink-0">7 Dias Grátis</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4E353F] mb-1">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={designerName}
                    onChange={(e) => setDesignerName(e.target.value)}
                    placeholder="Ex: Ana Paula Lima"
                    className="w-full text-xs p-3 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4E353F] mb-1">
                    Nome do seu Estúdio Lash *
                  </label>
                  <input
                    type="text"
                    required
                    value={studioName}
                    onChange={(e) => setStudioName(e.target.value)}
                    placeholder="Ex: Studio Ana Lash"
                    className="w-full text-xs p-3 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4E353F] mb-1">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(31) 99999-9999"
                      className="w-full text-xs p-3 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4E353F] mb-1">
                      Instagram Profissional
                    </label>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@studio.analash"
                      className="w-full text-xs p-3 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4E353F] mb-1">
                    E-mail para Acesso
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ana@email.com"
                    className="w-full text-xs p-3 bg-[#FFF9FB] border border-[#EEDCE3] rounded-xl text-[#2D1B22] focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83B66] hover:bg-[#962A50] rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Ativar Meu Teste de 7 Dias Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7D606B] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B8266]" />
                <span>Liberação rápida pelo WhatsApp ou E-mail</span>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#EAF5EE] text-[#3E7051] mx-auto flex items-center justify-center">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-[#2D1B22]">
                Solicitação Recebida, {designerName.split(' ')[0]}!
              </h4>
              <p className="text-xs text-[#6B4F59] leading-relaxed max-w-sm mx-auto">
                Seus 7 dias gratuitos no plano <strong>{chosenPlan.name}</strong> para o{' '}
                <strong>{studioName || designerName}</strong> foram reservados.
              </p>

              <div className="p-3 bg-[#FFF9FB] rounded-xl border border-[#F2DCE4] text-xs text-left space-y-1">
                <div className="flex justify-between gap-2">
                  <span className="text-[#6B4F59]">Seu link exclusivo:</span>
                  <strong className="text-[#B83B66] font-mono">
                    {BRAND.domain}/{slugifyStudio(studioName || designerName)}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B4F59]">Personalização de Logo:</span>
                  <strong className="text-[#5B8266]">Habilitada no Teste</strong>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href={whatsappConfirmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Liberar Mais Rápido no WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-[#6B4F59] bg-[#FFF9FB] hover:bg-[#FDF2F6] border border-[#EEDCE3] rounded-xl transition-colors"
                >
                  Voltar para a Página
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
