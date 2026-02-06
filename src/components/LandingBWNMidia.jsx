import { motion } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/5571992091220';
const BG_MOBILE = '/midia/bg-mobile-novo.webp';
const BG_DESKTOP = '/midia/bg-desktop-novo.webp';

function IconWhatsApp({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function LandingBWNMidia() {
  return (
    <div
      className="min-h-screen bg-black text-white antialiased"
      style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 600 }}
    >
      {/* ========== 1. HERO SECTION ========== */}
      <section
        className="relative min-h-[100dvh] sm:min-h-screen flex flex-col justify-start md:justify-center"
        aria-label="Dobra principal"
      >
        {/* Background via <picture>: o navegador escolhe a imagem pelo media (desktop ≥768px, senão mobile) */}
        <picture className="absolute inset-0 z-0 block w-full h-full" aria-hidden="true">
          <source media="(min-width: 768px)" srcSet={BG_DESKTOP} />
          <img
            src={BG_MOBILE}
            alt=""
            className="block w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </picture>

        {/* Conteúdo: acima do background (z-10); centralizado no mobile; no desktop à esquerda e no meio da altura */}
        <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left pt-[clamp(2.5rem,10vw,5rem)] md:pt-0 px-4 pb-8 w-full max-w-2xl md:pl-[clamp(2rem,8vw,4rem)]">
          <motion.h1
            className="text-[1.25rem] leading-tight font-bold text-white drop-shadow-sm sm:text-[1.35rem] md:text-[1.4rem] uppercase tracking-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sua empresa na Bahia vendendo todos os dias com uma{' '}
            <span className="text-gradient-orange-animated">Implementação de Verdade.</span>
          </motion.h1>
          <motion.p
            className="mt-3 text-white/90 text-[0.8125rem] leading-relaxed sm:text-sm max-w-md md:max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <strong>Pare de depender da sorte.</strong> Nós implementamos <strong>Tráfego Pago, Funis de Vendas e Social Media Inteligente</strong> para <strong>escalar o seu negócio.</strong>
          </motion.p>
          <motion.div
            className="mt-5 flex justify-center md:justify-start w-full md:w-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-shimmer btn-whatsapp-glow inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full bg-green-500 text-white font-bold text-sm tracking-wide uppercase cursor-pointer hover:bg-green-600 active:scale-[0.98] transition-all duration-200"
            >
              <IconWhatsApp className="w-5 h-5 flex-shrink-0" />
              Quero implementar agora
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== 2. SEGUNDA SESSÃO – A SOLUÇÃO ========== */}
      <section
        className="relative py-14 px-4 bg-zinc-900"
        aria-label="A solução"
      >
        <div className="max-w-xl mx-auto text-center">
          <motion.h2
            className="text-xl font-bold text-white sm:text-2xl uppercase tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
          >
            Chega de &apos;postar por postar&apos;. Aqui o foco é <span className="text-gradient-orange-animated">ROI.</span>
          </motion.h2>
          <motion.div
            className="mt-6 text-left text-white/90 text-[0.9375rem] leading-relaxed space-y-3 sm:text-base"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p>
              A maioria das agências só faz <strong>artes bonitas.</strong> A <strong>BWN Mídia</strong> cria um <strong>ecossistema de vendas</strong> para o seu negócio em <strong>Salvador e região</strong>:
            </p>
            <ul className="space-y-2 mt-4">
              {[
                <><strong>Tráfego Pago (Google & Meta)</strong> para atrair clientes prontos.</>,
                <><strong>Páginas Web</strong> otimizadas para conversão.</>,
                <><strong>Funil de Vendas</strong> que transforma cliques em lucro.</>,
                <><strong>Posicionamento de autoridade</strong> no digital.</>,
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-shimmer btn-whatsapp-glow inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-green-500 text-white font-bold text-base tracking-wide uppercase cursor-pointer shadow-lg hover:bg-green-600 active:scale-[0.98] transition-all duration-200"
            >
              <IconWhatsApp className="w-5 h-5 flex-shrink-0" />
              Agendar consultoria gratuita
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
