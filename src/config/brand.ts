export const BRAND = {
  name: 'BelaCore',
  fullName: 'BelaCore App',
  // Trocar para o domínio novo quando ele estiver registrado (belacore.com.br).
  domain: 'lashcore.com.br',
  whatsappNumber: '5531992200095',
  creatorCredit: 'um produto de Maycon Desenvolvedor de Software',
  storageKey: 'lashcore_leads',
  // Endereço do Google Apps Script que recebe os leads (veja as instruções). Vazio = não envia.
  leadsUrl:
    'https://script.google.com/macros/s/AKfycbworA4bfL4Yrj6IfwIDxFC2s43sU4lwKwcbSzgT_d7zNEpvkqoYxg5Ziv-XWPuTTL1KxA/exec',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function slugifyStudio(name: string): string {
  const slug = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'seustudio';
}
