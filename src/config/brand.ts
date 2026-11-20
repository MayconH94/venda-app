export const BRAND = {
  name: 'LashCore',
  fullName: 'LashCore App',
  domain: 'lashcore.me',
  whatsappNumber: '5531992200095',
  creatorCredit: 'um produto de Maycon Desenvolvedor de Software',
  storageKey: 'lashcore_leads',
  couponCode: 'LASH50OFF',
  // Endereço do Google Apps Script que recebe os leads (veja as instruções). Vazio = não envia.
  leadsUrl: '',
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
