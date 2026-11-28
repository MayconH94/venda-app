import { SubscriptionPlan } from '../types';

// Plano anual desligado por enquanto: o foco é assinatura mensal (SaaS).
// Para reativar, troque para true.
export const ANNUAL_BILLING_ENABLED = false;

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'solo',
    name: 'Essencial',
    tagline: 'Para começar a organizar seus atendimentos e sair do papel.',
    priceMonthly: 39.9,
    priceAnnualMonthly: 31.9,
    features: [
      'Agendamento online 24h direto pelo celular',
      'Link para colocar na bio do Instagram e no WhatsApp',
      'Catálogo de serviços com fotos, preços e duração',
      'Controle de expediente da semana e bloqueio de folgas',
      'Agenda do dia com cancelamento',
      'Lembrete de retorno para manutenção',
      'Botão de lembrete: abre o WhatsApp com a mensagem pronta',
      'Suporte pelo WhatsApp em horário comercial',
    ],
    ctaText: 'Testar 7 dias grátis',
  },
  {
    id: 'pro',
    name: 'Pro White-Label',
    tagline: 'Seu logotipo, suas cores, avisos no celular e sinal Pix contra faltas.',
    popular: true,
    priceMonthly: 69.9,
    priceAnnualMonthly: 55.9,
    whiteLabelHighlighted: true,
    features: [
      'Tudo do plano Essencial',
      '★ SEU LOGOTIPO, NOME E CORES NA PÁGINA DE AGENDAMENTO',
      '★ Avisos de novos agendamentos direto no seu celular',
      '★ Sinal Pix: o horário só é confirmado após o pagamento (em breve)',
      '★ Configuração inicial feita por nós (serviços, fotos e horários)',
      'Agendamentos 100% ilimitados',
      'Suporte prioritário via WhatsApp',
    ],
    ctaText: 'Testar 7 dias com meu logo',
  },
  {
    id: 'studio',
    name: 'Premium',
    tagline: 'Tudo do Pro, com automações que estamos lançando. Entre na lista.',
    priceMonthly: 119.9,
    priceAnnualMonthly: 95.9,
    features: [
      'Tudo do plano Pro White-Label incluído',
      'Lembretes automáticos no WhatsApp para as clientes (em breve)',
      'Sistema de assinaturas para as suas clientes (em breve)',
      'Suporte prioritário exclusivo',
    ],
    ctaText: 'Quero entrar na lista do Premium',
  },
];
