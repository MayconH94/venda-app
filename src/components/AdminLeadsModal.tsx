import React from 'react';
import { X, Download, Trash2, Phone, Instagram, Clock, AlertCircle } from 'lucide-react';
import { CapturedLead } from '../types';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: CapturedLead[];
  onClearLeads: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({
  isOpen,
  onClose,
  leads,
  onClearLeads,
}) => {
  if (!isOpen) return null;

  const exportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'Data',
      'Nome',
      'Estudio',
      'WhatsApp',
      'Instagram',
      'Email',
      'Clientes/Semana',
      'Horas WhatsApp/Dia',
      'Horas Perdidas/Mes',
      'Faltas/Mes',
      'Ticket Medio',
      'Prejuizo Faltas/Mes',
      'Maior Dor',
    ];

    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleDateString('pt-BR'),
      `"${(l.designerName || '').replace(/"/g, '""')}"`,
      `"${(l.studioName || '').replace(/"/g, '""')}"`,
      `"${(l.whatsapp || '').replace(/"/g, '""')}"`,
      `"${(l.instagram || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      l.weeklyClients,
      l.dailyChatHours,
      l.calculatedTimeSavedMonthlyHours,
      l.monthlyNoShows,
      l.averageTicket,
      l.calculatedRevenueRecoveredMonthly,
      `"${(l.biggestPainPoint || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_diagnostico_lashcore_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E8DFD8] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#FAF8F5] border-b border-[#E8DFD8] flex items-center justify-between">
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h3 className="font-serif font-bold text-xl text-[#2B231D]">
                Painel de Leads & Diagnósticos
              </h3>
              <span className="text-xs bg-[#8C5E48] text-white px-2 py-0.5 rounded-full font-medium">
                {leads.length} respostas coletadas
              </span>
            </div>
            <p className="text-xs text-[#786C62] mt-0.5">
              Visualize todas as informações preenchidas pelas Lash Designers para entender a rotina e validar o produto.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E8DFD8] flex items-center justify-between text-xs">
          <span className="text-[#6E6258]">Dados salvos no navegador (LocalStorage)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="px-3 py-1.5 bg-[#8C5E48] hover:bg-[#724B38] text-white rounded-lg flex items-center gap-1.5 disabled:opacity-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
            <button
              type="button"
              onClick={onClearLeads}
              disabled={leads.length === 0}
              className="px-3 py-1.5 bg-white text-[#B3404A] border border-[#E8DFD8] hover:bg-[#FDF0EE] rounded-lg flex items-center gap-1.5 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>
        </div>

        {/* Leads List */}
        <div className="p-6 overflow-y-auto flex-1">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-[#8C7B70] space-y-2">
              <Clock className="w-8 h-8 mx-auto opacity-50" />
              <p className="text-sm">Nenhum diagnóstico preenchido ainda.</p>
              <p className="text-xs">
                Preencha o formulário na seção "Diagnóstico da Rotina" ou envie o formulário de contato para ver os dados aparecerem aqui em tempo real.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl border border-[#E8DFD8] bg-[#FAF8F5] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD8] pb-2.5">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#2B231D]">
                        {lead.designerName} ·{' '}
                        <span className="font-sans font-normal text-sm text-[#8C5E48]">
                          {lead.studioName}
                        </span>
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 text-xs text-[#786C62] mt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#5B8266]" /> {lead.whatsapp}
                        </span>
                        {lead.instagram && (
                          <span className="flex items-center gap-1">
                            <Instagram className="w-3 h-3 text-[#B87D60]" /> {lead.instagram}
                          </span>
                        )}
                        {lead.email && <span>{lead.email}</span>}
                      </div>
                    </div>
                    <span className="text-[11px] text-[#A39387]">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(lead.createdAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5DAD0]">
                      <span className="text-[10px] text-[#8C7B70] block">Atendimentos/Semana</span>
                      <strong className="text-[#2B231D] text-sm tabular-nums">
                        {lead.weeklyClients} clientes
                      </strong>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5DAD0]">
                      <span className="text-[10px] text-[#8C7B70] block">Tempo no WhatsApp</span>
                      <strong className="text-[#8C5E48] text-sm tabular-nums">
                        {lead.dailyChatHours}h/dia ({lead.calculatedTimeSavedMonthlyHours}h/mês)
                      </strong>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5DAD0]">
                      <span className="text-[10px] text-[#8C7B70] block">Prejuízo Mensal Faltas</span>
                      <strong className="text-[#B3404A] text-sm tabular-nums">
                        R$ {lead.calculatedRevenueRecoveredMonthly},00/mês
                      </strong>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E5DAD0]">
                      <span className="text-[10px] text-[#8C7B70] block">Ticket Médio</span>
                      <strong className="text-[#5B8266] text-sm tabular-nums">
                        R$ {lead.averageTicket},00
                      </strong>
                    </div>
                  </div>

                  {lead.biggestPainPoint && (
                    <div className="text-xs bg-[#F7F2EE] p-2.5 rounded-lg border border-[#E8DFD8] text-[#5A4F46] flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-[#8C5E48] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#2B231D]">Maior Estresse Relatado: </strong>
                        <span>{lead.biggestPainPoint}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
