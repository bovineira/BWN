import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowRight,
  CheckCircle,
  Heart,
  Stethoscope,
  Calendar,
  TrendingUp,
  Users,
  Shield,
  MessageCircle,
  Clock,
  Star,
  Activity,
  UserCheck,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FormularioBWN from './FormularioBWN';

const SetorSaude = () => {
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
      nome: 'Tráfego Pago para Saúde',
      descricao: 'Campanhas no Google e Meta com compliance médico e segmentação precisa',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'agendamento',
      nome: 'Funil de Agendamento',
      descricao: 'Integração com WhatsApp e agenda online para mais consultas marcadas',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'reputacao',
      nome: 'Gestão de Reputação',
      descricao: 'Google Meu Negócio, avaliações e presença digital profissional',
      icon: Star,
      color: 'from-yellow-500 to-amber-500',
    },
    {
      id: 'crm',
      nome: 'CRM para Clínicas',
      descricao: 'Gestão de pacientes, lembretes automáticos e fidelização',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'compliance',
      nome: 'Marketing com Compliance',
      descricao: 'Campanhas dentro das normas do CFM, CRO e demais conselhos',
      icon: Shield,
      color: 'from-red-500 to-rose-500',
    },
    {
      id: 'automacao',
      nome: 'Automação de Confirmação',
      descricao: 'Lembretes de consulta via WhatsApp reduzindo faltas em até 70%',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const resultados = [
    { numero: '200+', label: 'Agendamentos/mês' },
    { numero: '70%', label: 'Menos faltas' },
    { numero: '5x', label: 'Mais avaliações' },
    { numero: '100%', label: 'Compliance' },
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
      {/* Header/Navbar */}
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
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <img
                  src="/image/bwn_certo.png"
                  alt="Logo BWN"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <button
                onClick={() => scrollToSection('servicos')}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Serviços
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
                className="px-6 py-2.5 border-2 border-emerald-500 text-emerald-500 rounded-xl font-semibold hover:bg-emerald-500 hover:text-black transition-all duration-300"
              >
                Quero Mais Pacientes
              </motion.button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-4 pb-4"
              >
                <Link to="/" className="block w-full text-left text-gray-300 hover:text-white py-2">
                  Home
                </Link>
                <button
                  onClick={() => scrollToSection('servicos')}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Serviços
                </button>
                <button
                  onClick={() => scrollToSection('resultados')}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Resultados
                </button>
                <motion.button
                  onClick={() => scrollToSection('formulario')}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-2.5 border-2 border-emerald-500 text-emerald-500 rounded-xl font-semibold"
                >
                  Quero Mais Pacientes
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6"
          >
            <Stethoscope className="text-emerald-500" size={20} />
            <span className="text-emerald-500 font-semibold">Setor de Saúde</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Mais Pacientes
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              para sua Clínica
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Marketing digital especializado para clínicas, consultórios e profissionais de saúde.{' '}
            <span className="text-emerald-500 font-semibold">
              100% dentro das normas dos conselhos
            </span>{' '}
            — mais agendamentos, menos faltas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => scrollToSection('formulario')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-2 mx-auto sm:mx-0"
            >
              Quero Mais Pacientes
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problemas do Setor */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Você enfrenta esses desafios?
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Agenda com horários vazios e muitas faltas',
                'Dificuldade em atrair novos pacientes',
                'Medo de fazer marketing fora das normas do conselho',
                'Poucas avaliações no Google',
                'Pacientes não retornam para acompanhamento',
                'Concorrência forte na região',
              ].map((problema, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20"
                >
                  <X className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-300">{problema}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
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
                Soluções para o Setor de Saúde
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Marketing ético e eficiente para clínicas e consultórios
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
                  className="glass-card rounded-2xl p-6 border-white/10 hover:border-emerald-500/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${servico.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                    {servico.nome}
                  </h3>
                  <p className="text-gray-400">{servico.descricao}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Resultados */}
      <section id="resultados" className="py-20 px-4 relative bg-black/30">
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
                Resultados Reais
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              O que nossos clientes do setor de saúde conquistaram
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {resultados.map((resultado, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center border-white/10"
              >
                <div className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2">
                  {resultado.numero}
                </div>
                <div className="text-gray-400 text-sm">{resultado.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={() => scrollToSection('formulario')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2"
            >
              Quero Esses Resultados
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Formulário */}
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
                Vamos Lotar Sua Agenda?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Preencha o formulário e receba uma consultoria gratuita para sua clínica
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative glass-strong rounded-3xl p-6 md:p-8 border border-emerald-500/30 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
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

      {/* WhatsApp */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Prefere Falar Direto?
              </span>
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Converse com nossa equipe especializada em marketing para saúde
            </p>

            <motion.a
              href="https://wa.me/5571992091220?text=Olá!%20Tenho%20uma%20clínica%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20BWN"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37, 211, 102, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Falar no WhatsApp
              <ArrowRight size={20} />
            </motion.a>
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
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/imobiliario" className="hover:text-white transition-colors">
                Imobiliário
              </Link>
              <Link to="/delivery" className="hover:text-white transition-colors">
                Delivery
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SetorSaude;


