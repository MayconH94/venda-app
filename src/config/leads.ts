import { BRAND } from './brand';
import type { CapturedLead } from '../types';

/**
 * Envia o lead para a planilha (Google Apps Script). Nunca atrapalha a página:
 * se o endereço não estiver configurado ou a rede falhar, o lead continua salvo no navegador.
 */
export function sendLead(lead: CapturedLead): void {
  if (!BRAND.leadsUrl) return;

  const payload = {
    createdAt: lead.createdAt,
    designerName: lead.designerName ?? '',
    studioName: lead.studioName ?? '',
    whatsapp: lead.whatsapp ?? '',
    instagram: lead.instagram ?? '',
    email: lead.email ?? '',
    weeklyClients: lead.weeklyClients,
    dailyChatHours: lead.dailyChatHours,
    monthlyNoShows: lead.monthlyNoShows,
    averageTicket: lead.averageTicket,
    biggestPainPoint: lead.biggestPainPoint ?? '',
    estimatedHoursPerMonth: lead.calculatedTimeSavedMonthlyHours,
    estimatedLossPerMonth: lead.calculatedRevenueRecoveredMonthly,
    source: 'site-diagnostico',
  };

  // text/plain evita a verificação prévia (CORS) do navegador; o Apps Script lê o corpo normalmente.
  fetch(BRAND.leadsUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // sem rede: o lead continua salvo no navegador
  });
}
