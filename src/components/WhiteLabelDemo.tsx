import React, { useState } from 'react';
import {
  Crown,
  Upload,
  Palette,
  Check,
  Calendar,
  Clock,
  CheckCircle,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { BeautyService } from '../types';
import { BRAND, slugifyStudio } from '../config/brand';

interface WhiteLabelDemoProps {
  onOpenTrial: () => void;
}

const COLOR_THEMES = [
  { id: 'rose', name: 'Rosé', primary: '#B9506B', bg: '#FFF7F8', accent: '#F9D5DC', text: '#4A2A33' },
  { id: 'vinho', name: 'Vinho', primary: '#832E4D', bg: '#FBF5F7', accent: '#E8C5D0', text: '#4A2A33' },
  { id: 'lilas', name: 'Lilás', primary: '#774AA8', bg: '#FAF7FD', accent: '#E1D3F3', text: '#3A2A4A' },
  { id: 'dourado', name: 'Dourado', primary: '#8F6419', bg: '#FFFBF2', accent: '#F6E0AE', text: '#3F2F14' },
  { id: 'salvia', name: 'Sálvia', primary: '#4B7551', bg: '#F6FAF6', accent: '#C9E0CB', text: '#25392A' },
  { id: 'petroleo', name: 'Azul-petróleo', primary: '#2B7886', bg: '#F4F9FA', accent: '#BDE0E5', text: '#1B3A41' },
];

const PRESET_LOGOS = [
  { id: 'initials', label: 'Monograma' },
];

const SAMPLE_SERVICES: BeautyService[] = [
  {
    id: '1',
    name: 'Volume Russo',
    category: 'Cílios',
    duration: '2h 00min',
    price: 200,
    description: 'Fios ultrafinos para um olhar marcante, leve e de alta retenção.',
    badge: 'Mais Pedido',
  },
  {
    id: '2',
    name: 'Alongamento em Gel',
    category: 'Unhas',
    duration: '2h 30min',
    price: 180,
    description: 'Unhas mais longas e resistentes, com acabamento natural e brilho duradouro.',
  },
  {
    id: '3',
    name: 'Design de Sobrancelhas',
    category: 'Sobrancelhas',
    duration: '45min',
    price: 60,
    description: 'Design personalizado para valorizar o formato do seu rosto.',
  },
  {
    id: '4',
    name: 'Escova Modelada',
    category: 'Cabelos',
    duration: '1h 00min',
    price: 80,
    description: 'Cabelo alinhado e com movimento para o seu dia ou evento.',
  },
];


const SAMPLE_DATES = ['Amanhã (Ter)', 'Quarta, 15', 'Quinta, 16'];
const SAMPLE_HOURS = ['09:00', '11:30', '14:00', '16:30'];

export const WhiteLabelDemo: React.FC<WhiteLabelDemoProps> = ({ onOpenTrial }) => {
  const [studioName, setStudioName] = useState('Studio Ana Bela');
  const [selectedTheme, setSelectedTheme] = useState(COLOR_THEMES[0]);
  const [logoType, setLogoType] = useState<'preset' | 'custom'>('preset');
  const [presetLogo, setPresetLogo] = useState('initials');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [requireDeposit, setRequireDeposit] = useState(false);
  const [depositAmount, setDepositAmount] = useState('30,00');

  // Client interactive booking simulation state
  const [selectedService, setSelectedService] = useState<BeautyService>(SAMPLE_SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState(SAMPLE_DATES[0]);
  const [selectedHour, setSelectedHour] = useState('14:00');
  const [bookingStep, setBookingStep] = useState<'service' | 'datetime' | 'confirmed'>('service');
  const [clientName, setClientName] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');

  const slug = slugifyStudio(studioName);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCustomLogoUrl(uploadEvent.target?.result as string);
        setLogoType('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const resetSimulation = () => {
    setBookingStep('service');
    setSelectedService(SAMPLE_SERVICES[0]);
    setSelectedDate(SAMPLE_DATES[0]);
    setSelectedHour('14:00');
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (name.trim().slice(0, 2) || 'BC').toUpperCase();
  };

  return (
    <section id="personalizador-marca" className="py-16 md:py-24 bg-white border-b border-[#F2DCE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B83B66]">
            <Crown className="w-4 h-4 text-[#B83B66]" />
            <span>Personalização White-Label Total</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2D1B22] tracking-tight leading-tight">
            Seu logo, suas cores e a sua autoridade. <br className="hidden sm:inline" />
            <span className="font-semibold italic text-[#B83B66]">
              A cliente vê a sua marca do começo ao fim.
            </span>
          </h2>
          <p className="text-base text-[#6B4F59]">
            No {BRAND.name}, a estrela é o seu estúdio. O link que você coloca na bio do Instagram ou envia no WhatsApp tem 100% da sua identidade visual. Veja abaixo em tempo real:
          </p>
        </div>

        {/* 2-Column Split: Customization Controls vs Interactive Client Mobile View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-6 space-y-6 bg-[#FFF9FB] p-6 sm:p-8 rounded-2xl border border-[#F2DCE4]">
            <div className="border-b border-[#F2DCE4] pb-4">
              <h3 className="font-serif text-2xl font-bold text-[#2D1B22] flex items-center justify-between gap-2">
                <span>Painel de Identidade do Estúdio</span>
                <span className="text-xs font-sans font-medium text-[#B83B66] bg-[#FCE7EE] px-2.5 py-1 rounded shrink-0">
                  Incluso no Plano Pro
                </span>
              </h3>
              <p className="text-xs text-[#6B4F59] mt-1">
                Personalize os dados abaixo e veja a tela do celular da sua cliente mudar na hora:
              </p>
            </div>

            {/* Studio Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="studio-name-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#4E353F]"
              >
                Nome do seu Studio ou Marca
              </label>
              <input
                id="studio-name-input"
                type="text"
                maxLength={35}
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                placeholder="Ex: Studio Ana Bela"
                className="w-full px-4 py-2.5 bg-white border border-[#EEDCE3] rounded-xl text-sm font-medium text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#B83B66]/20 focus:border-[#B83B66]"
              />
              <p className="text-[11px] text-[#7D606B] flex items-center gap-1">
                <span>Seu link (exemplo):</span>
                <span className="font-mono font-medium text-[#B83B66]">
                  {BRAND.domain}/{slug}
                </span>
              </p>
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4E353F] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#B83B66]" />
                <span>Paleta de Cores da sua Marca</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {COLOR_THEMES.map((theme) => {
                  const isSelected = selectedTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedTheme(theme)}
                      aria-pressed={isSelected}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-[#B83B66] bg-white shadow-sm ring-2 ring-[#B83B66]/20'
                          : 'border-[#EEDCE3] bg-white hover:border-[#D9B8C4]'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-medium text-[#2D1B22] truncate">
                        {theme.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logo Customization: Upload or Chic Monogram */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4E353F] flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#B83B66]" />
                <span>Logotipo próprio ou inicial do nome</span>
              </span>

              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex-1 cursor-pointer p-3.5 bg-white border border-dashed focus-within:ring-2 focus-within:ring-[#93384F] border-[#DFB9C7] hover:border-[#B83B66] rounded-xl flex items-center gap-3 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="sr-only"
                  />
                  <div className="w-10 h-10 rounded-lg bg-[#FDF2F6] border border-[#F2DCE4] flex items-center justify-center text-[#B83B66] shrink-0">
                    {customLogoUrl ? (
                      <img src={customLogoUrl} alt="Logo" className="w-8 h-8 rounded object-contain" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-[#2D1B22] truncate">
                      {customLogoUrl ? 'Logo carregado (Trocar)' : 'Fazer Upload do seu Logo'}
                    </p>
                    <p className="text-[11px] text-[#7D606B]">PNG transparente ou JPEG</p>
                  </div>
                </label>

                <div className="flex-1 flex items-center gap-1.5 bg-white p-2 rounded-xl border border-[#EEDCE3]">
                  {PRESET_LOGOS.map((preset) => {
                    const isSelected = logoType === 'preset' && presetLogo === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setLogoType('preset');
                          setPresetLogo(preset.id);
                        }}
                        aria-pressed={isSelected}
                        className={`flex-1 py-2 text-[11px] font-medium rounded-lg text-center transition-all ${
                          isSelected
                            ? 'bg-[#B83B66] text-white shadow-xs font-semibold'
                            : 'text-[#6B4F59] hover:bg-[#FDF2F6]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Anti-No-Show Pix Deposit Toggle */}
            <div className="pt-2 border-t border-[#F2DCE4] flex items-center justify-between gap-4">
              <div>
                <label htmlFor="pixDeposit" className="text-xs font-semibold text-[#2D1B22] block cursor-pointer">
                  Sinal Pix Anti-Falta (em breve)
                </label>
                <span className="text-[11px] text-[#7D606B] block">
                  A cliente paga um valor antecipado (abatido no total) para garantir a vaga.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="checkbox"
                  id="pixDeposit"
                  checked={requireDeposit}
                  onChange={(e) => setRequireDeposit(e.target.checked)}
                  className="w-4 h-4 accent-[#B83B66] rounded border-gray-300"
                />
                {requireDeposit && (
                  <div className="flex items-center gap-1 text-xs font-bold text-[#B83B66] bg-white border border-[#EEDCE3] px-2 py-1 rounded-lg">
                    <span>R$</span>
                    <input
                      type="text"
                      aria-label="Valor do sinal Pix"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-12 text-center text-xs font-bold focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* CTA inside configurator */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenTrial}
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83B66] hover:bg-[#962A50] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Testar 7 Dias com Meu Logotipo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Smartphone View */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[370px] bg-[#24131A] p-3.5 rounded-[44px] shadow-2xl border-4 border-[#4A2B37] relative">
              <div className="w-32 h-4 bg-[#24131A] rounded-b-xl mx-auto mb-2 flex items-center justify-center">
                <div className="w-10 h-1 bg-[#4A2B37] rounded-full" />
              </div>

              {/* Smartphone Inner Screen */}
              <div
                role="region"
                aria-label="Simulação da tela de agendamento da cliente"
                tabIndex={0}
                className="rounded-[32px] overflow-hidden min-h-[580px] max-h-[620px] overflow-y-auto flex flex-col justify-between"
                style={{ backgroundColor: selectedTheme.bg }}
              >
                {/* Header with Designer Brand & Logo */}
                <div
                  className="p-5 text-center border-b shadow-xs relative"
                  style={{
                    backgroundColor: 'white',
                    borderColor: selectedTheme.accent,
                  }}
                >
                  <div className="flex justify-center mb-2.5">
                    {logoType === 'custom' && customLogoUrl ? (
                      <div
                        className="w-14 h-14 rounded-full p-1 bg-white shadow-md border"
                        style={{ borderColor: selectedTheme.primary }}
                      >
                        <img
                          src={customLogoUrl}
                          alt={studioName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm text-white font-serif font-bold text-lg"
                        style={{ backgroundColor: selectedTheme.primary }}
                      >
                        {presetLogo === 'initials' && getInitials(studioName)}
                      </div>
                    )}
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#1E1B18] tracking-tight truncate">
                    {studioName.trim() || 'Seu Studio'}
                  </h4>
                  <p className="text-[11px] text-[#6B6056] flex items-center justify-center gap-1 mt-0.5">
                    <span>Profissional de beleza</span>
                    <span>·</span>
                    <span className="font-medium text-[#3E7051]">Agenda Aberta</span>
                  </p>

                  <div
                    className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ backgroundColor: selectedTheme.accent, color: selectedTheme.primary }}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>Agenda online</span>
                  </div>
                </div>

                {/* Body Content according to step */}
                <div className="p-4 flex-1">
                  {bookingStep === 'service' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#3D352E]">
                          Escolha o Procedimento
                        </span>
                        <span className="text-[11px] font-medium" style={{ color: selectedTheme.primary }}>
                          {SAMPLE_SERVICES.length} opções
                        </span>
                      </div>

                      {SAMPLE_SERVICES.map((service) => {
                        const isChosen = selectedService.id === service.id;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setSelectedService(service)}
                            aria-pressed={isChosen}
                            className={`w-full text-left p-3 rounded-xl border cursor-pointer transition-all ${
                              isChosen
                                ? 'bg-white shadow-sm ring-1'
                                : 'bg-white/85 hover:bg-white border-[#E5DAD0]'
                            }`}
                            style={{
                              borderColor: isChosen ? selectedTheme.primary : '#E5DAD0',
                              boxShadow: isChosen ? `0 0 0 1px ${selectedTheme.primary}` : undefined,
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center flex-wrap gap-1.5">
                                  <span
                                    className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                                    style={{
                                      backgroundColor: selectedTheme.accent,
                                      color: selectedTheme.primary,
                                    }}
                                  >
                                    {service.category}
                                  </span>
                                  {service.badge && (
                                    <span
                                      className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                                      style={{ backgroundColor: selectedTheme.primary }}
                                    >
                                      {service.badge}
                                    </span>
                                  )}
                                </div>
                                <h5 className="text-xs font-bold text-[#1E1B18] mt-1">
                                  {service.name}
                                </h5>
                                <p className="text-[10px] text-[#6B6056] line-clamp-2 mt-0.5">
                                  {service.description}
                                </p>
                                <span
                                  className="text-[10px] font-medium flex items-center gap-1 mt-1"
                                  style={{ color: selectedTheme.primary }}
                                >
                                  <Clock className="w-2.5 h-2.5" /> {service.duration}
                                </span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-xs font-bold text-[#1E1B18] tabular-nums">
                                  R$ {service.price.toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => setBookingStep('datetime')}
                        className="w-full mt-2 py-3 rounded-xl text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98]"
                        style={{ backgroundColor: selectedTheme.primary }}
                      >
                        <span>Continuar para Data & Horário</span>
                      </button>
                    </div>
                  )}

                  {bookingStep === 'datetime' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setBookingStep('service')}
                          className="text-[11px] font-medium text-[#6B6056] hover:underline"
                        >
                          ← Voltar aos Serviços
                        </button>
                        <span className="text-[11px] font-bold text-[#1E1B18] truncate max-w-[140px]">
                          {selectedService.name}
                        </span>
                      </div>

                      {/* Day picker simulation */}
                      <div className="bg-white p-3 rounded-xl border border-[#E5DAD0] space-y-2">
                        <span className="text-[11px] font-bold text-[#3D352E] flex items-center gap-1">
                          <Calendar className="w-3 h-3" style={{ color: selectedTheme.primary }} /> Datas com Vagas Livres
                        </span>
                        <div className="grid grid-cols-3 gap-1.5 text-center">
                          {SAMPLE_DATES.map((dateLabel) => {
                            const isSelected = selectedDate === dateLabel;
                            return (
                              <button
                                key={dateLabel}
                                type="button"
                                onClick={() => setSelectedDate(dateLabel)}
                                aria-pressed={isSelected}
                                className="py-2 px-1 rounded-lg text-[10px] font-semibold border transition-all"
                                style={
                                  isSelected
                                    ? {
                                        backgroundColor: selectedTheme.accent,
                                        color: selectedTheme.primary,
                                        borderColor: selectedTheme.primary,
                                      }
                                    : {
                                        backgroundColor: '#F9FAFB',
                                        color: '#374151',
                                        borderColor: '#E5E7EB',
                                      }
                                }
                              >
                                {dateLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hour slots */}
                      <div className="bg-white p-3 rounded-xl border border-[#E5DAD0] space-y-2">
                        <span className="text-[11px] font-bold text-[#3D352E] flex items-center gap-1">
                          <Clock className="w-3 h-3" style={{ color: selectedTheme.primary }} /> Horários Livres
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {SAMPLE_HOURS.map((h) => {
                            const isSelected = selectedHour === h;
                            return (
                              <button
                                key={h}
                                type="button"
                                onClick={() => setSelectedHour(h)}
                                aria-pressed={isSelected}
                                className="py-2 rounded-lg text-xs font-bold border transition-all"
                                style={
                                  isSelected
                                    ? {
                                        backgroundColor: selectedTheme.primary,
                                        color: '#FFFFFF',
                                        borderColor: selectedTheme.primary,
                                      }
                                    : {
                                        backgroundColor: '#FFFFFF',
                                        color: '#3D352E',
                                        borderColor: '#E0D5CC',
                                      }
                                }
                              >
                                {h}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Client Info inputs */}
                      <div className="bg-white p-3 rounded-xl border border-[#E5DAD0] space-y-2">
                        <span className="text-[11px] font-bold text-[#3D352E]">Dados da Cliente</span>
                        <input
                          type="text"
                          placeholder="Seu nome completo"
                          aria-label="Nome da cliente (simulação)"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full text-xs p-2 bg-[#F9F7F5] border border-gray-200 rounded-lg focus:outline-none"
                        />
                        <input
                          type="tel"
                          placeholder="WhatsApp com DDD (ex: 31 99220-0095)"
                          aria-label="WhatsApp da cliente (simulação)"
                          value={clientWhatsapp}
                          onChange={(e) => setClientWhatsapp(e.target.value)}
                          className="w-full text-xs p-2 bg-[#F9F7F5] border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>

                      {requireDeposit && (
                        <div className="p-2.5 rounded-lg bg-[#FAF2EB] border border-[#E0CFBF] text-[11px] text-[#6E4F3E] flex items-center gap-2">
                          <CreditCard className="w-4 h-4 shrink-0 text-[#8C5E48]" />
                          <span>
                            Sinal Pix anti-falta: <strong>R$ {depositAmount}</strong> (descontado no atendimento).
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setBookingStep('confirmed')}
                        className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98]"
                        style={{ backgroundColor: selectedTheme.primary }}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Confirmar Agendamento</span>
                      </button>
                    </div>
                  )}

                  {bookingStep === 'confirmed' && (
                    <div className="bg-white p-5 rounded-2xl border border-[#E5DAD0] text-center space-y-3 shadow-sm">
                      <div
                        className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white"
                        style={{ backgroundColor: selectedTheme.primary }}
                      >
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>

                      <h5 className="font-serif font-bold text-base text-[#1E1B18]">
                        Horário Reservado!
                      </h5>

                      <p className="text-[11px] text-[#6E6258] leading-relaxed">
                        {clientName.trim() ? `${clientName.trim()}, seu horário foi agendado` : 'Agendado'} no{' '}
                        <strong>{studioName.trim() || 'Seu Estúdio'}</strong> para{' '}
                        <strong>
                          {selectedDate} às {selectedHour}
                        </strong>
                        .
                      </p>

                      <div className="p-3 bg-[#FAF8F5] rounded-xl text-left text-[11px] space-y-1 border border-[#E8DFD8]">
                        <div className="flex justify-between gap-2 text-[#5A4F46]">
                          <span>Procedimento:</span>
                          <span className="font-bold text-[#2B231D] text-right">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between text-[#5A4F46]">
                          <span>Valor Total:</span>
                          <span className="font-bold text-[#2B231D]">
                            R$ {selectedService.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <div className="flex justify-between text-[#3E7051] pt-1 border-t border-[#E8DFD8]">
                          <span>Na sua agenda:</span>
                          <span className="font-semibold">Agendamento recebido</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-[#6B6056]">
                        *Simulação. No app de verdade, o agendamento aparece na sua agenda e você chama a cliente no WhatsApp com a mensagem pronta, em 1 toque.
                      </p>

                      <button
                        type="button"
                        onClick={resetSimulation}
                        className="text-xs font-bold hover:underline flex items-center justify-center gap-1 mx-auto pt-2"
                        style={{ color: selectedTheme.primary }}
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reiniciar Demonstração</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer of the smartphone */}
                <div className="p-3 bg-white border-t border-gray-100 text-center">
                  <span className="text-[11px] text-[#6B6056]">
                    Agendamento oficial · {studioName.trim() || 'Seu Studio'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
