import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BRAND } from '../config/brand';

const FAQS = [
  {
    question: 'Preciso instalar alguma coisa ou a cliente precisa criar conta?',
    answer:
      'Não! Tudo funciona direto no navegador do celular, por um link exclusivo na sua bio do Instagram ou WhatsApp. A cliente não baixa nenhum aplicativo e não precisa criar senha — ela escolhe o serviço, o horário livre e informa apenas nome e telefone.',
  },
  {
    question: 'Como funciona para colocar o meu logotipo e as cores do meu estúdio?',
    answer: `No Plano Pro White-Label, basta enviar o seu logotipo (PNG ou JPEG) e escolher a paleta de cores que combina com a sua marca. A partir daí, sua cliente vê a sua identidade visual e agenda pelo seu link.`,
  },
  {
    question: 'Serve para quais áreas da beleza?',
    answer:
      'Para quem atende uma cliente por vez, com hora marcada: cílios, unhas, sobrancelhas, cabelos, estética, maquiagem e outras. Você cadastra os seus próprios serviços, com preço, duração e foto. Cada conta é para uma profissional.',
  },
  {
    question: 'Posso bloquear dias, folgas e definir tempos diferentes por procedimento?',
    answer:
      'Sim! Você define o expediente de cada dia da semana, pode fechar um dia inteiro ou bloquear algumas horas quando precisar, e configura durações reais para cada serviço (por exemplo: 2h para um alongamento de cílios, 2h30 para unhas em gel e 45 min para um design de sobrancelhas).',
  },
  {
    question: 'Vocês cobram sinal Pix para evitar faltas?',
    answer:
      'Ainda não. O sinal Pix está nos planos de lançamento e vai entrar no plano Premium. Enquanto isso, o botão de lembrete da agenda abre o WhatsApp com a mensagem pronta para a cliente confirmar o horário.',
  },
  {
    question: 'Preciso ter CNPJ para assinar o BelaCore?',
    answer: `Não! O ${BRAND.name} foi pensado tanto para profissionais autônomas que atendem em casa ou sala alugada quanto para estúdios já estruturados com MEI ou CNPJ. Tudo o que você precisa é de um celular com WhatsApp.`,
  },
  {
    question: 'Posso ver o sistema funcionando antes de contratar?',
    answer:
      'Sim. Chame no WhatsApp e eu mostro a demonstração ao vivo, com a sua cor e a sua logo. Depois, se gostar, você escolhe a cobrança mensal ou anual. Não existe fidelidade nem multa — você pode cancelar quando quiser.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-[#F2DCE4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#B83B66]">
            <HelpCircle className="w-4 h-4 text-[#B83B66]" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2D1B22] tracking-tight">
            Perguntas Frequentes sobre o {BRAND.name}
          </h2>
          <p className="text-base text-[#6B4F59]">
            Tudo o que você precisa saber para organizar o agendamento do seu studio de beleza:
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#F2DCE4] bg-[#FFF9FB] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-resposta-${index}`}
                  id={`faq-pergunta-${index}`}
                  className="w-full min-h-11 p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif font-bold text-lg text-[#2D1B22]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B83B66] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-resposta-${index}`}
                    role="region"
                    aria-labelledby={`faq-pergunta-${index}`}
                    className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#6B4F59] leading-relaxed border-t border-[#F7E8EE] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
