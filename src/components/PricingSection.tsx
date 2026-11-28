import React, { useState } from 'react';
import { Check, Gem, ShieldCheck, ArrowRight, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SubscriptionPlan } from '../types';
import { SUBSCRIPTION_PLANS, ANNUAL_BILLING_ENABLED } from '../data/plans';

interface PricingSectionProps {
  onSelectPlan: (plan: SubscriptionPlan, cycle: 'monthly' | 'annual') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeMobilePlanId, setActiveMobilePlanId] = useState<string>('pro');

  const activeMobilePlan =
    SUBSCRIPTION_PLANS.find((p) => p.id === activeMobilePlanId) || SUBSCRIPTION_PLANS[1];

  return (
    <section id="planos" className="py-16 md:py-24 bg-white border-b border-[#F2DCE4] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B83B66]">
            <Gem className="w-4 h-4 text-[#B83B66]" />
            <span>Assinatura Simples e Transparente</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2D1B22] tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Planos de assinatura que se pagam <br className="hidden sm:inline" />
            <span className="font-semibold italic text-[#B83B66]">
              com apenas 1 atendimento recuperado no mês.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B4F59]">
            Sem surpresas e sem taxas por agendamento. Veja a demonstração ao vivo, com a sua marca, antes de contratar.
          </p>

          {/* Billing Cycle Switch (oculto enquanto o plano anual está desligado) */}
          {ANNUAL_BILLING_ENABLED && (
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1 bg-[#FDF2F6] rounded-xl border border-[#F2DCE4]">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                aria-pressed={billingCycle === 'monthly'}
                className={`min-h-11 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#2D1B22] shadow-xs'
                    : 'text-[#6B4F59] hover:text-[#2D1B22]'
                }`}
              >
                Cobrança Mensal
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                aria-pressed={billingCycle === 'annual'}
                className={`min-h-11 px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  billingCycle === 'annual'
                    ? 'bg-[#B83B66] text-white shadow-xs'
                    : 'text-[#6B4F59] hover:text-[#2D1B22]'
                }`}
              >
                <span>Plano Anual</span>
                <span className="text-[10px] bg-[#FCE7EE] text-[#2D1B22] font-bold px-1.5 py-0.5 rounded">
                  2 Meses Grátis
                </span>
              </button>
            </div>
          </div>
          )}
        </motion.div>

        {/* MOBILE VIEW (< lg) */}
        <div className="lg:hidden space-y-6">
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-[#FDF2F6] rounded-2xl border border-[#F2DCE4]">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isSelected = activeMobilePlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setActiveMobilePlanId(plan.id)}
                  aria-pressed={isSelected}
                  className={`relative min-h-11 py-2.5 px-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 flex flex-col items-center justify-center ${
                    isSelected
                      ? plan.popular
                        ? 'bg-[#2B1820] text-white shadow-md'
                        : 'bg-white text-[#2D1B22] shadow-sm'
                      : 'text-[#6B4F59] hover:text-[#2D1B22]'
                  }`}
                >
                  <span className="truncate max-w-full">
                    {plan.id === 'solo' ? 'Essencial' : plan.id === 'pro' ? 'Pro' : 'Premium'}
                  </span>
                  <span
                    className={`text-[10px] tabular-nums ${
                      isSelected
                        ? plan.popular
                          ? 'text-[#F7D6E2]'
                          : 'text-[#B83B66]'
                        : 'text-[#7D606B]'
                    }`}
                  >
                    R${' '}
                    {(billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly)
                      .toFixed(2)
                      .replace('.', ',')}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative pt-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeMobilePlan.id}-${billingCycle}`}
                initial={{ opacity: 0, y: 36, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.94 }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 19,
                  mass: 0.8,
                }}
                className={`rounded-2xl flex flex-col justify-between relative ${
                  activeMobilePlan.popular
                    ? 'bg-[#2B1820] text-white border-2 border-[#B83B66] shadow-2xl'
                    : 'bg-[#FFF9FB] text-[#2D1B22] border border-[#F2DCE4] shadow-md'
                }`}
              >
                {activeMobilePlan.popular && (
                  <motion.div
                    initial={{ scale: 0.8, y: -6 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 14, delay: 0.08 }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B83B66] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap"
                  >
                    <Crown className="w-3 h-3" />
                    <span>Recomendado</span>
                  </motion.div>
                )}

                <div className="p-6 space-y-5">
                  <div
                    className="space-y-1 border-b pb-4"
                    style={{
                      borderColor: activeMobilePlan.popular ? 'rgba(255,255,255,0.15)' : '#F2DCE4',
                    }}
                  >
                    <h3 className="font-serif text-2xl font-bold tracking-tight">
                      {activeMobilePlan.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        activeMobilePlan.popular ? 'text-[#DFC4CE]' : 'text-[#6B4F59]'
                      }`}
                    >
                      {activeMobilePlan.tagline}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold">R$</span>
                      <span className="font-serif text-4xl font-bold tracking-tight tabular-nums">
                        {(billingCycle === 'annual'
                          ? activeMobilePlan.priceAnnualMonthly
                          : activeMobilePlan.priceMonthly
                        )
                          .toFixed(2)
                          .replace('.', ',')}
                      </span>
                      <span
                        className={`text-xs ${
                          activeMobilePlan.popular ? 'text-[#DFC4CE]' : 'text-[#6B4F59]'
                        }`}
                      >
                        / mês
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p
                        className={`text-[11px] font-medium ${
                          activeMobilePlan.popular ? 'text-[#F7D6E2]' : 'text-[#B83B66]'
                        }`}
                      >
                        Faturado anualmente (R${' '}
                        {(activeMobilePlan.priceAnnualMonthly * 12).toFixed(2).replace('.', ',')}/ano)
                      </p>
                    )}
                  </div>

                  {activeMobilePlan.whiteLabelHighlighted && (
                    <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-xs text-[#F7D6E2] font-medium">
                      Permite inserir o <strong>logotipo</strong> e as <strong>cores</strong> do seu estúdio no cabeçalho do agendamento.
                    </div>
                  )}

                  <ul className="space-y-2.5 text-xs">
                    {activeMobilePlan.features.map((feature, idx) => {
                      const isHighlight = feature.startsWith('★');
                      return (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isHighlight
                                ? activeMobilePlan.popular
                                  ? 'text-[#F7D6E2]'
                                  : 'text-[#B83B66]'
                                : 'text-[#3E7051]'
                            }`}
                          />
                          <span
                            className={
                              isHighlight
                                ? 'font-bold'
                                : activeMobilePlan.popular
                                  ? 'text-white/90'
                                  : 'text-[#4E353F]'
                            }
                          >
                            {feature.replace('★ ', '')}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onSelectPlan(activeMobilePlan, billingCycle)}
                    className={`w-full py-4 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 ${
                      activeMobilePlan.popular
                        ? 'bg-[#B83B66] hover:bg-[#962A50] text-white shadow-md'
                        : 'bg-white hover:bg-[#FDF2F6] text-[#2D1B22] border border-[#EEDCE3]'
                    }`}
                  >
                    <span>{activeMobilePlan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <p
                    className={`text-[10px] text-center mt-2 ${
                      activeMobilePlan.popular ? 'text-[#C6A9B4]' : 'text-[#7D606B]'
                    }`}
                  >
                    Peça uma demonstração · Cancele quando quiser
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* DESKTOP VIEW (>= lg) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-stretch pt-2">
          {SUBSCRIPTION_PLANS.map((plan, index) => {
            const isPro = plan.popular;
            const currentPrice =
              billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 54, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: isPro ? 1.02 : 1 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: isPro ? -10 : -6 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 18,
                  mass: 0.85,
                  delay: index * 0.12,
                }}
                className={`rounded-2xl flex flex-col justify-between relative ${
                  isPro
                    ? 'bg-[#2B1820] text-white border-2 border-[#B83B66] shadow-2xl z-10'
                    : 'bg-[#FFF9FB] text-[#2D1B22] border border-[#F2DCE4] shadow-xs hover:shadow-lg'
                }`}
              >
                {isPro && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.85 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 420, damping: 15, delay: 0.3 }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B83B66] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1 whitespace-nowrap"
                  >
                    <Crown className="w-3 h-3" />
                    <span>Recomendado</span>
                  </motion.div>
                )}

                <div className="p-7 sm:p-8 space-y-6">
                  <div
                    className="space-y-1.5 border-b pb-5"
                    style={{ borderColor: isPro ? 'rgba(255,255,255,0.15)' : '#F2DCE4' }}
                  >
                    <h3 className="font-serif text-2xl font-bold tracking-tight">{plan.name}</h3>
                    <p className={`text-xs ${isPro ? 'text-[#DFC4CE]' : 'text-[#6B4F59]'}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={billingCycle}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-baseline gap-1"
                      >
                        <span className="text-sm font-semibold">R$</span>
                        <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight tabular-nums">
                          {currentPrice.toFixed(2).replace('.', ',')}
                        </span>
                        <span className={`text-xs ${isPro ? 'text-[#DFC4CE]' : 'text-[#6B4F59]'}`}>
                          / mês
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    {billingCycle === 'annual' && (
                      <p
                        className={`text-[11px] font-medium ${
                          isPro ? 'text-[#F7D6E2]' : 'text-[#B83B66]'
                        }`}
                      >
                        Faturado anualmente (R$ {(currentPrice * 12).toFixed(2).replace('.', ',')}/ano)
                      </p>
                    )}
                  </div>

                  {plan.whiteLabelHighlighted && (
                    <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-xs text-[#F7D6E2] font-medium">
                      Permite inserir o <strong>logotipo</strong> e as <strong>cores</strong> do seu estúdio no cabeçalho do agendamento.
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block ${
                        isPro ? 'text-[#F7D6E2]' : 'text-[#6B4F59]'
                      }`}
                    >
                      O que está incluso:
                    </span>
                    <ul className="space-y-2.5 text-xs">
                      {plan.features.map((feature, idx) => {
                        const isHighlight = feature.startsWith('★');
                        return (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check
                              className={`w-4 h-4 mt-0.5 shrink-0 ${
                                isHighlight
                                  ? isPro
                                    ? 'text-[#F7D6E2]'
                                    : 'text-[#B83B66]'
                                  : 'text-[#3E7051]'
                              }`}
                            />
                            <span
                              className={
                                isHighlight ? 'font-bold' : isPro ? 'text-white/90' : 'text-[#4E353F]'
                              }
                            >
                              {feature.replace('★ ', '')}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="p-7 sm:p-8 pt-0">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectPlan(plan, billingCycle)}
                    className={`w-full py-4 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 ${
                      isPro
                        ? 'bg-[#B83B66] hover:bg-[#962A50] text-white shadow-md hover:shadow-lg'
                        : 'bg-white hover:bg-[#FDF2F6] text-[#2D1B22] border border-[#EEDCE3]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <p
                    className={`text-[10px] text-center mt-2 ${
                      isPro ? 'text-[#C6A9B4]' : 'text-[#7D606B]'
                    }`}
                  >
                    Peça uma demonstração · Cancele quando quiser
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance Strip */}
        <div className="pt-8 border-t border-[#F2DCE4] flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-[#6B4F59]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3E7051]" />
            <span>Sem fidelidade: cancele a assinatura quando quiser</span>
          </div>
          <span className="text-[#DEC5CE] hidden md:inline" aria-hidden="true">
            ·
          </span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3E7051]" />
            <span>Zero taxas extras por agendamento ou cliente</span>
          </div>
          <span className="text-[#DEC5CE] hidden md:inline" aria-hidden="true">
            ·
          </span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3E7051]" />
            <span>Suporte humanizado pelo WhatsApp na configuração do seu estúdio</span>
          </div>
        </div>
      </div>
    </section>
  );
};
