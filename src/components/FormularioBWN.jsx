import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const FormularioBWN = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    nomeResponsavel: '',
    whatsapp: '',
    servicos: [],
    orcamento: '',
  });

  const totalSteps = 4;

  const servicos = [
    { id: 'trafego', nome: 'Tráfego Pago', icon: '📊' },
    { id: 'edicao', nome: 'Edição de Vídeo', icon: '🎬' },
    { id: 'crm', nome: 'CRM', icon: '💼' },
    { id: 'social', nome: 'Social Media', icon: '📱' },
    { id: 'web', nome: 'Web Design', icon: '🎨' },
  ];

  const orcamentos = [
    'Até R$ 2k',
    'R$ 2k - R$ 5k',
    'R$ 5k - R$ 10k',
    'Acima de R$ 10k',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleServico = (servicoId) => {
    setFormData((prev) => {
      const servicos = prev.servicos.includes(servicoId)
        ? prev.servicos.filter((id) => id !== servicoId)
        : [...prev.servicos, servicoId];
      return { ...prev, servicos };
    });
  };

  const handleOrcamentoChange = (orcamento) => {
    setFormData((prev) => ({ ...prev, orcamento }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          formData.nomeEmpresa.trim() !== '' &&
          formData.nomeResponsavel.trim() !== '' &&
          formData.whatsapp.trim() !== ''
        );
      case 2:
        return formData.servicos.length > 0;
      case 3:
        return formData.orcamento !== '';
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep() && step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Dados do formulário:', formData);
    // Aqui você pode enviar os dados para uma API
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo BWN */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/image/bwn.png"
            alt="Logo BWN"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </motion.div>

        {/* Barra de Progresso */}
        <div className="mb-8">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-bwn-orange"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-400 text-center">
            Etapa {step} de {totalSteps}
          </div>
        </div>

        {/* Container do Formulário */}
        <motion.div
          className="bg-bwn-dark border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {/* Etapa 1: Dados Básicos */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Escale sua empresa na Bahia com a BWN
                  </h1>
                  <p className="text-gray-400 text-lg">
                    Junte-se às empresas que já faturaram mais de{' '}
                    <span className="text-bwn-orange font-semibold">R$ 30k</span>{' '}
                    conosco
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      name="nomeEmpresa"
                      value={formData.nomeEmpresa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-bwn-orange focus:ring-2 focus:ring-bwn-orange/20 text-white transition-all duration-300"
                      placeholder="Digite o nome da sua empresa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome do Responsável
                    </label>
                    <input
                      type="text"
                      name="nomeResponsavel"
                      value={formData.nomeResponsavel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-bwn-orange focus:ring-2 focus:ring-bwn-orange/20 text-white transition-all duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-bwn-orange focus:ring-2 focus:ring-bwn-orange/20 text-white transition-all duration-300"
                      placeholder="(71) 99999-9999"
                    />
                  </div>
                </div>

                <motion.button
                  onClick={handleNext}
                  disabled={!validateStep()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-bwn-orange text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-bwn-orange/50"
                >
                  Próximo
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            )}

            {/* Etapa 2: Seleção de Serviços */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    O que sua empresa precisa hoje?
                  </h2>
                  <p className="text-gray-400">
                    Selecione um ou mais serviços
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicos.map((servico) => {
                    const isSelected = formData.servicos.includes(servico.id);
                    return (
                      <motion.button
                        key={servico.id}
                        onClick={() => toggleServico(servico.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-bwn-orange bg-bwn-orange/10 shadow-lg shadow-bwn-orange/20'
                            : 'border-gray-700 bg-black/30 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{servico.icon}</span>
                          <span className="font-semibold">{servico.nome}</span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              <Check className="text-bwn-orange" size={20} />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-all duration-300"
                  >
                    <ArrowLeft size={20} />
                    Voltar
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    disabled={!validateStep()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-bwn-orange text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-bwn-orange/50"
                  >
                    Próximo
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Etapa 3: Orçamento */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Qual sua meta de investimento mensal?
                  </h2>
                  <p className="text-gray-400">
                    Selecione a faixa de investimento
                  </p>
                </div>

                <div className="space-y-3">
                  {orcamentos.map((orcamento) => {
                    const isSelected = formData.orcamento === orcamento;
                    return (
                      <motion.button
                        key={orcamento}
                        onClick={() => handleOrcamentoChange(orcamento)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-bwn-orange bg-bwn-orange/10 shadow-lg shadow-bwn-orange/20'
                            : 'border-gray-700 bg-black/30 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{orcamento}</span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <div className="w-5 h-5 rounded-full bg-bwn-orange flex items-center justify-center">
                                <Check size={12} className="text-black" />
                              </div>
                            </motion.div>
                          )}
                          {!isSelected && (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-all duration-300"
                  >
                    <ArrowLeft size={20} />
                    Voltar
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    disabled={!validateStep()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-bwn-orange text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-bwn-orange/50"
                  >
                    Finalizar
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Etapa 4: Finalização */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-24 h-24 rounded-full bg-bwn-orange/20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Check className="text-bwn-orange" size={48} strokeWidth={3} />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Obrigado!
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
                    A BWN vai analisar o perfil da sua empresa e entraremos em
                    contato via WhatsApp em breve para alavancar seus resultados.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center gap-2 mt-8"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{
                        delay: 0.6 + i * 0.1,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      <Sparkles className="text-bwn-orange" size={20} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default FormularioBWN;

