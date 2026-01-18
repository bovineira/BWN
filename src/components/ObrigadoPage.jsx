import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ObrigadoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
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

      {/* Main Content */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          {/* Logo BWN */}
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

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full glass-card border-bwn-orange/30 bg-bwn-orange/10 flex items-center justify-center glow-orange">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle className="text-bwn-orange" size={48} strokeWidth={3} />
              </motion.div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Obrigado!
            </span>
          </motion.h1>

          {/* Sub Headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Em breve você será respondido via{' '}
            <span className="text-bwn-orange font-semibold">WhatsApp</span> para alavancar seus resultados.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 85, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-2 mx-auto glow-orange hover:glow-orange-strong transition-all duration-300"
            >
              Voltar para página inicial
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default ObrigadoPage;
