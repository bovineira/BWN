import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, TrendingUp, Users, Target, ArrowDown, Clock } from 'lucide-react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, isPast, addDays, getDay, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const WHATSAPP_URL = 'https://wa.me/5571993636428?text=Ola,%20selecionei%20uma%20data%20na%20agenda%20e%20quero%20confirmar.';

function IconWhatsApp({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function CountUp({ end, duration = 2, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}
      {hasAnimated ? count.toLocaleString('pt-BR') : '0'}
      {suffix}
    </span>
  );
}

export default function AgendaDelivery() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const agendaRef = useRef(null);

  const today = new Date();
  const currentMonth = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const monthStart = startOfWeek(currentMonth, { weekStartsOn: 0 });
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const availableTimes = ['14:00', '15:30', '17:00', 'Prefiro outro horário'];

  const handleDateClick = (day) => {
    if (isPast(day) && !isSameDay(day, today)) return;
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setShowModal(true);
  };

  const scrollToAgenda = () => {
    agendaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-poppins antialiased" style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}>
      {/* ========== 1. HERO SECTION ========== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/agenda-delivery/bg-hero-agenda.webp)' }}
          role="img"
          aria-hidden="true"
        />
        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A Estratégia de Escala que Donos de Delivery usam para{' '}
            <span className="text-green-500">Bater R$ 100k/mês com Lucro.</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Saia da guerra de preços do iFood. Implemente um Ecossistema de Vendas Próprio.
          </motion.p>
          <motion.button
            onClick={scrollToAgenda}
            className="btn-green-shimmer btn-scale-pulse bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-2 mx-auto shadow-lg shadow-green-500/30 transition-all duration-300"
            style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar Sessão Estratégica
            <ArrowDown className="w-5 h-5" />
          </motion.button>
          
          {/* Setinha e texto "arraste para baixo" */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="w-6 h-6 text-white" strokeWidth={2.5} />
            </motion.div>
            <p className="text-xs text-white/70 font-normal">arraste para baixo</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== 2. DEMONSTRAÇÃO DE RESULTADOS ========== */}
      <section className="py-20 px-4 bg-zinc-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-center text-zinc-900"
            style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Demonstração de Resultados
          </motion.h2>
          <motion.p
            className="text-lg text-zinc-600 mb-12 text-center font-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            De um único cliente nosso com investimento baixo mensal
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                semana: 1,
                periodo: '11 a 17 de jan',
                investido: 595.95,
                pedidos: 35,
                faturamento: 3168.78,
              },
              {
                semana: 2,
                periodo: '19-25 jan',
                investido: 223.32,
                pedidos: 20,
                faturamento: 1927.32,
              },
              {
                semana: 3,
                periodo: '26 jan - 1 fev',
                investido: 495.96,
                pedidos: 29,
                faturamento: 2699.92,
              },
              {
                semana: 4,
                periodo: '2-9 fev',
                investido: 616.24,
                pedidos: 27,
                faturamento: 2341.22,
              },
            ].map((semana, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}>
                    SEMANA {semana.semana}
                  </h3>
                  <p className="text-sm text-zinc-600 font-normal">{semana.periodo}</p>
                </div>

                {/* Métricas */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-700 font-normal">Investido</span>
                    <span className="text-sm text-zinc-900 font-medium">
                      R$ {semana.investido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-700 font-normal">Pedidos</span>
                    <span className="text-sm text-zinc-900 font-medium">{semana.pedidos}</span>
                  </div>
                </div>

                {/* Separador */}
                <div className="border-t border-zinc-200 my-4" />

                {/* Faturamento */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-700 font-normal">Faturamento</span>
                  <span className="text-3xl font-bold text-green-500" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}>
                    R$ {semana.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={scrollToAgenda}
              className="btn-green-shimmer btn-scale-pulse bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-2 shadow-lg shadow-green-500/30 transition-all duration-300"
              style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Sessão Estratégica
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ========== 3. O QUE SERÁ ENTREGUE ========== */}
      <section className="py-20 px-4 bg-zinc-100">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center text-zinc-900"
            style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            O que vamos implementar no seu Delivery:
          </motion.h2>
          <div className="space-y-4">
            {[
              'Funil de Venda Direta (Adeus taxas abusivas)',
              'Recuperação de Clientes Inativos (LTV)',
              'Tráfego Pago Geolocalizado (Raio de Entrega)',
              'Engenharia de Cardápio (Aumento de Ticket Médio)',
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 bg-white border border-zinc-200 rounded-xl p-5 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-lg font-normal text-zinc-900">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={scrollToAgenda}
              className="btn-green-shimmer btn-scale-pulse bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-2 shadow-lg shadow-green-500/30 transition-all duration-300"
              style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Sessão Estratégica
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ========== 4. PARA QUEM É ========== */}
      <section className="py-20 px-4 bg-zinc-100">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center text-zinc-900"
            style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Requisitos para a Sessão:
          </motion.h2>
          <div className="space-y-4">
            {[
              'Faturar acima de R$ 15k/mês',
              'Ter operação de entrega validada',
              'Mentalidade de crescimento',
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 bg-white border border-zinc-200 rounded-xl p-5 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-normal text-zinc-900">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={scrollToAgenda}
              className="btn-green-shimmer btn-scale-pulse bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-2 shadow-lg shadow-green-500/30 transition-all duration-300"
              style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Sessão Estratégica
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ========== 5. AGENDA INTELIGENTE ========== */}
      <section ref={agendaRef} className="py-20 px-4 bg-zinc-100">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center text-zinc-900"
            style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Escolha o melhor horário para você:
          </motion.h2>

          {/* Calendário */}
          <motion.div
            className="bg-white border border-zinc-200 rounded-xl p-6 mb-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Cabeçalho do mês */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-zinc-900" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}>
                {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
              </h3>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-sm text-zinc-600 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Grade do calendário */}
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day, idx) => {
                const isPastDay = isPast(day) && !isSameDay(day, today);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);

                return (
                  <button
                    key={idx}
                    onClick={() => handleDateClick(day)}
                    disabled={isPastDay || !isCurrentMonth}
                    className={`
                      aspect-square rounded-lg text-sm font-medium transition-all duration-200
                      ${isPastDay || !isCurrentMonth
                        ? 'text-zinc-300 cursor-not-allowed bg-zinc-50'
                        : isSelected
                        ? 'bg-green-500 text-white scale-105 shadow-lg'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:scale-105'
                      }
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Seleção de Horário */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold mb-4 text-center text-zinc-900" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}>
                Horários disponíveis para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}:
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {availableTimes.map((time) => (
                  <motion.button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className="px-6 py-3 bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-xl font-bold transition-all duration-200 shadow-sm"
                    style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {time === 'Prefiro outro horário' ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {time}
                      </span>
                    ) : (
                      time
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ========== MODAL/POP-UP ========== */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}>Horário Pré-Reservado!</h3>
                  <p className="text-gray-300 mb-6 text-center font-normal">
                    Para confirmar sua sessão com nosso especialista, toque no botão abaixo e finalize no WhatsApp.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-shimmer btn-whatsapp-glow relative inline-flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white text-lg tracking-wide uppercase cursor-pointer transition-all duration-200"
                    style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
                  >
                    <IconWhatsApp className="w-6 h-6 flex-shrink-0" />
                    FALAR AGORA E CONFIRMAR
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
