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
  Target
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
      id: 'trafego',
      nome: 'Tráfego Pago',
      descricao: 'Ads que convertem',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'edicao',
      nome: 'Edição de Vídeo',
      descricao: 'Cortes virais e VSL',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'crm',
      nome: 'CRM & Automação',
      descricao: 'Gestão de leads',
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'social',
      nome: 'Social Media',
      descricao: 'Branding forte',
      icon: Instagram,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'web',
      nome: 'Web Design',
      descricao: 'Sites rápidos',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Escale sua Empresa na Bahia
            </span>
            <br />
            <span className="bg-gradient-to-r from-bwn-orange to-orange-400 bg-clip-text text-transparent">
              com Inteligência Digital
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Tráfego, CRM e Design de alta performance.{' '}
            <span className="text-bwn-orange font-semibold">
              Já geramos mais de R$ 30k em escala
            </span>{' '}
            para nossos parceiros.
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
              Soluções integradas para escalar seu negócio digital
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

