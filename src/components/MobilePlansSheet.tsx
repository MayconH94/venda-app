import React, { useState } from 'react';
import { X, Check, Crown, ArrowRight, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SubscriptionPlan } from '../types';
import { SUBSCRIPTION_PLANS } from '../data/plans';
import { BRAND } from '../config/brand';

interface MobilePlansSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: SubscriptionPlan, cycle: 'monthly' | 'annual') => void;
  onScrollToFullTable: () => void;
}

export const MobilePlansSheet: React.FC<MobilePlansSheetProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
  onScrollToFullTable,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activePlanId, setActivePlanId] = useState<string>('pro');

  const activePlan =
    SUBSCRIPTION_PLANS.find((p) => p.id === activePlanId) || SUBSCRIPTION_PLANS[1];
  const currentPrice =
    billingCycle === 'annual' ? activePlan.priceAnnualMonthly : activePlan.priceMonthly;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1E1B18]/65 backdrop-blur-xs"
          />

          {/* Spring Pop-Up Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Planos de Assinatura ${BRAND.name}`}
            initial={{ y: '100%', opacity: 0.5, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 25,
              mass: 0.9,
            }}
            className="relative w-full max-w-md bg-[#FFF9FB] rounded-t-3xl md:rounded-3xl shadow-2xl border border-[#F2DCE4] overflow-hidden max-h-[88vh] flex flex-col z-10"
          >
            {/* Mobile Drag Handle */}
            <div className="pt-2.5 pb-1 flex justify-center md:hidden">
              <div className="w-10 h-1 bg-[#E2B8C7] rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 pt-3 pb-3 border-b border-[#F2DCE4] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FDF2F6] border border-[#F2DCE4] text-[#B83B66] flex items-center justify-center">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#2D1B22] leading-tight">
                    Planos {BRAND.name}
                  </h3>
                  <p className="text-[11px] text-[#6B4F59]">Demonstração ao vivo · Coloque seu logotipo</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar planos"
                className="p-2 text-[#6B4F59] hover:text-[#2D1B22] rounded-xl hover:bg-[#FDF2F6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Billing Cycle Switch */}
            <div className="px-5 pt-3 pb-2 bg-[#FFF9FB] space-y-2.5">
              <div className="flex p-1 bg-[#F7E8EE] rounded-xl border border-[#F2DCE4]">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-[#2D1B22] shadow-xs'
                      : 'text-[#6B4F59]'
                  }`}
                >
                  Mensal
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    billingCycle === 'annual'
                      ? 'bg-[#B83B66] text-white shadow-xs'
                      : 'text-[#6B4F59]'
                  }`}
                >
                  <span>Anual</span>
                  <span className="text-[10px] bg-[#FCE7EE] text-[#2D1B22] font-bold px-1.5 py-0.5 rounded">
                    -20%
                  </span>
                </button>
              </div>

              {/* Plan Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5">
                {SUBSCRIPTION_PLANS.map((plan) => {
                  const isActive = activePlanId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setActivePlanId(plan.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        isActive
                          ? plan.popular
                            ? 'bg-[#2B1820] text-white border-[#B83B66] shadow-sm'
                            : 'bg-white text-[#2D1B22] border-[#B83B66] shadow-sm'
                          : 'bg-white/70 text-[#6B4F59] border-[#F2DCE4]'
                      }`}
                    >
                      {plan.id === 'solo' ? 'Essencial' : plan.id === 'pro' ? 'Pro' : 'Equipe'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Plan Card */}
            <div className="px-5 py-3 overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activePlan.id}-${billingCycle}`}
                  initial={{ opacity: 0, y: 18, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className={`rounded-2xl p-5 border space-y-4 ${
                    activePlan.popular
                      ? 'bg-[#2B1820] text-white border-[#B83B66] shadow-xl'
                      : 'bg-white text-[#2D1B22] border-[#F2DCE4] shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif text-xl font-bold">{activePlan.name}</h4>
                        {activePlan.popular && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-[#B83B66] text-white px-2 py-0.5 rounded-full">
                            <Crown className="w-2.5 h-2.5" /> Top
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs mt-0.5 ${
                          activePlan.popular ? 'text-[#DFC4CE]' : 'text-[#6B4F59]'
                        }`}
                      >
                        {activePlan.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-xs font-semibold">R$</span>
                    <span className="font-serif text-4xl font-bold tracking-tight tabular-nums">
                      {currentPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span
                      className={`text-xs ${
                        activePlan.popular ? 'text-[#DFC4CE]' : 'text-[#6B4F59]'
                      }`}
                    >
                      / mês
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs pt-1">
                    {activePlan.features.slice(0, 6).map((feature, idx) => {
                      const isHighlight = feature.startsWith('★');
                      return (
                        <li key={idx} className="flex items-start gap-2">
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isHighlight
                                ? activePlan.popular
                                  ? 'text-[#F7D6E2]'
                                  : 'text-[#B83B66]'
                                : 'text-[#5B8266]'
                            }`}
                          />
                          <span
                            className={
                              isHighlight
                                ? 'font-bold'
                                : activePlan.popular
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
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Action */}
            <div className="p-5 pt-3 bg-white border-t border-[#F2DCE4] space-y-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onClose();
                  onSelectPlan(activePlan, billingCycle);
                }}
                className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#B83B66] hover:bg-[#962A50] rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>{activePlan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onScrollToFullTable();
                }}
                className="w-full py-1.5 text-xs font-medium text-[#6B4F59] hover:text-[#2D1B22] text-center"
              >
                Comparar todos os benefícios na página →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
