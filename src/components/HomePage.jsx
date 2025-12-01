import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  TrendingUp, 
  Video, 
  Database, 
  Instagram, 
  Globe,
  ArrowRight,
  CheckCircle,
  MapPin,
  Users,
  Target,
  MessageCircle,
  Brain,
  BarChart3,
  Zap,
  Shield,
  Sparkles,
  Briefcase
} from 'lucide-react';
import FormularioBWN from './FormularioBWN';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const servicos = [
    {
      id: 'midia',
      nome: 'Mídia Paga orientada a ROI',
      descricao: 'Google Ads, Meta, TikTok, LinkedIn com IA e otimização contínua',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'cro',
      nome: 'CRO & Growth de Produto',
      descricao: 'Testes A/B, UX writing, análise de funil e personalização com IA',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'analytics',
      nome: 'Data Analytics & BI',
      descricao: 'Dashboards, MMM, modelagem preditiva e atribuição',
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'automacao',
      nome: 'Automação & CRM',
      descricao: 'Jornadas omnichannel, scoring preditivo e fidelização',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'ia',
      nome: 'Agentes de IA Operacionais',
      descricao: 'Monitoramento 24/7, otimização autônoma e geração de criativos',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'criativos',
      nome: 'Conteúdo & Criativos com IA',
      descricao: 'Geração em escala, variações multiformato e produção presencial',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Header/Navbar Flutuante */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-strong border-b border-white/10 py-3'
            : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <img
                src="/image/bwn_certo.png"
                alt="Logo BWN"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('servicos')}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('resultados')}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Resultados
              </button>
              <motion.button
                onClick={() => scrollToSection('formulario')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 border-2 border-bwn-orange text-bwn-orange rounded-xl font-semibold hover:bg-bwn-orange hover:text-black transition-all duration-300"
              >
                Agendar Consultoria
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-4 pb-4"
              >
                <button
                  onClick={() => scrollToSection('servicos')}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Serviços
                </button>
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Sobre
                </button>
                <button
                  onClick={() => scrollToSection('resultados')}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Resultados
                </button>
                <motion.button
                  onClick={() => scrollToSection('formulario')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-2.5 border-2 border-bwn-orange text-bwn-orange rounded-xl font-semibold hover:bg-bwn-orange hover:text-black transition-all duration-300"
                >
                  Agendar Consultoria
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-bwn-orange/20 rounded-full blur-3xl"
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
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bwn-orange/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          {/* Logo BWN em Destaque */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-bwn-orange/20 rounded-full blur-2xl opacity-50" />
              <img
                src="/image/bwn_certo.png"
                alt="Logo BWN"
                className="h-24 md:h-32 lg:h-40 w-auto object-contain relative z-10 drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Performance, Growth & IA
            </span>
            <br />
            <span className="bg-gradient-to-r from-bwn-orange to-orange-400 bg-clip-text text-transparent">
              para marcas de qualquer setor
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Consultoria de marketing de performance orientada por dados e Inteligência Artificial.{' '}
            <span className="text-bwn-orange font-semibold">
              Aceleramos crescimento por aquisição e retenção
            </span>{' '}
            — de pequenas empresas a grandes marcas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => scrollToSection('formulario')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 85, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-2 mx-auto glow-orange hover:glow-orange-strong transition-all duration-300"
            >
              Quero Escalar Agora
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Seção de Serviços */}
      <section id="servicos" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                O Ecossistema BWN
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Atuamos como braço estratégico do seu negócio, combinando experimentação, automação e IA
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicos.map((servico) => {
              const Icon = servico.icon;
              return (
                <motion.div
                  key={servico.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="glass-card rounded-2xl p-6 border-white/10 hover:border-bwn-orange/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${servico.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-bwn-orange transition-colors">
                    {servico.nome}
                  </h3>
                  <p className="text-gray-400">{servico.descricao}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Seção de Diferenciais */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Por que escolher a BWN?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Diferente de uma agência tradicional, atuamos como braço estratégico do seu negócio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'Cobrança baseada em performance',
                desc: 'Só crescemos se você crescer. Nossos resultados são mensuráveis e transparentes.',
                color: 'from-bwn-orange to-orange-500',
              },
              {
                icon: BarChart3,
                title: 'Dados no centro',
                desc: 'Decisões guiadas por métricas, não por achismos. Analytics e BI integrados.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Brain,
                title: 'IA aplicada de ponta a ponta',
                desc: 'Do planejamento ao criativo, da operação à análise. Agentes autônomos 24/7.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Database,
                title: 'Transparência total',
                desc: 'Dashboards em tempo real e rituais de otimização. Você vê tudo que acontece.',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: Shield,
                title: 'Compliance & Segurança',
                desc: 'Práticas alinhadas à LGPD e padrões do mercado. Segurança em primeiro lugar.',
                color: 'from-indigo-500 to-blue-500',
              },
              {
                icon: Briefcase,
                title: 'Experiência em mercados regulados',
                desc: 'Jurídico, saúde, finanças — sem perder versatilidade para outros setores.',
                color: 'from-yellow-500 to-orange-500',
              },
            ].map((diferencial, index) => {
              const Icon = diferencial.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 border-white/10 hover:border-bwn-orange/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${diferencial.color} flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{diferencial.title}</h3>
                  <p className="text-gray-400 text-sm">{diferencial.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Botão CTA - Terceira Dobra */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={() => scrollToSection('formulario')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 85, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 glow-orange hover:glow-orange-strong transition-all duration-300"
            >
              Descubra Como Podemos Ajudar
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Seção Setores Atendidos */}
      <section className="py-20 px-4 relative bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Para quem atendemos
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              De operações em início de tração a marcas em escala
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                'E-commerce',
                'Varejo',
                'Serviços',
                'Educação',
                'Saúde',
                'Jurídico',
                'Indústria',
                'Imobiliário',
                'Fintechs',
                'SaaS',
              ].map((setor, index) => (
                <motion.div
                  key={setor}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="text-center p-4 rounded-xl bg-black/30 border border-white/10 hover:border-bwn-orange/50 hover:bg-bwn-orange/5 transition-all duration-300"
                >
                  <span className="text-white font-medium text-sm md:text-base">{setor}</span>
                </motion.div>
              ))}
            </div>

            {/* Botão CTA - Quarta Dobra */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mt-12"
            >
              <motion.button
                onClick={() => scrollToSection('formulario')}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 85, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 glow-orange hover:glow-orange-strong transition-all duration-300"
              >
                Agendar Consultoria Gratuita
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção Foco Bahia */}
      <section id="sobre" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bwn-orange/50 to-transparent" />
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bwn-orange/10 border border-bwn-orange/30 mb-6"
                >
                  <MapPin className="text-bwn-orange" size={20} />
                  <span className="text-bwn-orange font-semibold">Foco Bahia</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Entendemos o Mercado Local
                  </span>
                </h2>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  A BWN nasceu na Bahia e cresceu entendendo as particularidades do mercado baiano. 
                  Conhecemos a cultura, os desafios e as oportunidades que fazem sua empresa única.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-bwn-orange flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-300">
                      Atendimento personalizado para empresas baianas
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-bwn-orange flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-300">
                      Estratégias adaptadas ao perfil do consumidor local
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-bwn-orange flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-300">
                      Proximidade e suporte contínuo
                    </p>
                  </div>
                </div>

                {/* Botão CTA - Terceira Dobra */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.button
                    onClick={() => scrollToSection('formulario')}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 85, 0, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 glow-orange hover:glow-orange-strong transition-all duration-300"
                  >
                    Agendar Consultoria Gratuita
                    <ArrowRight size={20} />
                  </motion.button>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-6 text-center border-white/10">
                    <Users className="text-bwn-orange mx-auto mb-3" size={40} />
                    <div className="text-3xl font-bold text-white mb-1">30k+</div>
                    <div className="text-gray-400 text-sm">Reais escalados</div>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-center border-white/10">
                    <Target className="text-bwn-orange mx-auto mb-3" size={40} />
                    <div className="text-3xl font-bold text-white mb-1">100%</div>
                    <div className="text-gray-400 text-sm">Foco Bahia</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Resultados */}
      <section id="resultados" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Resultados que Falam
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Empresas que confiaram na BWN e escalaram seus resultados
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-bwn-orange to-orange-400 bg-clip-text text-transparent">
              R$ 30k+
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Já escalamos mais de <span className="text-bwn-orange font-bold">30 mil reais</span> para nossos clientes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
              <div className="glass-card rounded-xl p-6 border-white/10">
                <div className="text-3xl font-bold text-white mb-2">5+</div>
                <div className="text-gray-400">Serviços Integrados</div>
              </div>
              <div className="glass-card rounded-xl p-6 border-white/10">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-400">Foco em Performance</div>
              </div>
              <div className="glass-card rounded-xl p-6 border-white/10">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">Suporte Contínuo</div>
              </div>
            </div>

            {/* Botão CTA - Quarta Dobra */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <motion.button
                onClick={() => scrollToSection('formulario')}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 85, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 glow-orange hover:glow-orange-strong transition-all duration-300"
              >
                Quero Escalar Minha Empresa
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Conversão - Formulário */}
      <section id="formulario" className="py-20 px-4 relative min-h-screen flex items-center">
        <div className="container mx-auto max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Sua Empresa é a Próxima?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Preencha o formulário abaixo e descubra como podemos escalar seus resultados
            </p>
          </motion.div>

          {/* 
            ============================================
            AQUI ESTÁ O COMPONENTE FormularioBWN
            ============================================
            O componente FormularioBWN já foi criado anteriormente
            e está sendo importado no topo deste arquivo.
            Ele contém o formulário multi-etapas completo.
            ============================================
          */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Container com destaque visual para o formulário */}
            <div className="relative glass-strong rounded-3xl p-6 md:p-8 border border-bwn-orange/30 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl shadow-2xl">
              {/* Borda decorativa superior */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bwn-orange/60 to-transparent" />
              
              {/* Efeito de brilho sutil */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-bwn-orange/20 via-transparent to-bwn-orange/20 rounded-3xl blur-sm opacity-50 -z-10" />
              
              <style>{`
                #formulario [class*="min-h-screen"] {
                  min-height: auto !important;
                }
                #formulario [class*="animated-gradient"] {
                  background: transparent !important;
                }
                #formulario [class*="glass-strong"] {
                  background: transparent !important;
                  border: none !important;
                  box-shadow: none !important;
                }
              `}</style>
              <FormularioBWN />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção Alternativa - WhatsApp Direto */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Borda decorativa */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bwn-orange/50 to-transparent" />
            
            {/* Efeito de brilho */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 rounded-3xl blur-sm opacity-30 -z-10" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 glow-orange">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Prefere Falar Direto?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Se você prefere uma conversa rápida, fale conosco diretamente pelo WhatsApp.{' '}
              <span className="text-bwn-orange font-semibold">
                Respondemos em até 24 horas!
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.a
                href="https://wa.me/5571992091220?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20BWN"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37, 211, 102, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg glow-orange hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Falar no WhatsApp Agora
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-gray-400 mt-6"
            >
              Ou continue preenchendo o formulário acima para uma análise mais detalhada
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/image/bwn_certo.png"
                alt="Logo BWN"
                className="h-10 w-auto object-contain"
              />
              <span className="text-gray-400">© 2024 BWN. Todos os direitos reservados.</span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <button
                onClick={() => scrollToSection('servicos')}
                className="hover:text-white transition-colors"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="hover:text-white transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('formulario')}
                className="hover:text-bwn-orange transition-colors"
              >
                Contato
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

