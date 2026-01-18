import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FormularioBWN = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    nomeResponsavel: '',
    whatsapp: '',
    nicho: '',
    servicos: [],
    orcamento: '',
  });

  const totalSteps = 3;

  const servicos = [
    { id: 'trafego', nome: 'Tráfego Pago', icon: '📊' },
    { id: 'edicao', nome: 'Edição de Vídeo', icon: '🎬' },
    { id: 'crm', nome: 'CRM', icon: '💼' },
    { id: 'social', nome: 'Social Media', icon: '📱' },
    { id: 'web', nome: 'Web Design', icon: '🎨' },
    { id: 'agente_ia', nome: 'Agente de IA', icon: '🤖' },
    { id: 'nao_sei', nome: 'Não sei dizer', icon: '❓' },
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

  const handleWhatsAppChange = (e) => {
    let value = e.target.value;
    // Remove tudo que não é número
    value = value.replace(/\D/g, '');
    // Limita a 11 dígitos (DDD + 9 dígitos)
    value = value.slice(0, 11);
    
    // Aplica a formatação (XX) XXXXX-XXXX
    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      }
    }
    
    setFormData((prev) => ({ ...prev, whatsapp: value }));
  };

  const handleNomeChange = (e) => {
    let value = e.target.value;
    // Remove números e caracteres especiais, mantém apenas letras (incluindo acentos), espaços e hífens
    value = value.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s-]/g, '');
    setFormData((prev) => ({ ...prev, nomeResponsavel: value }));
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
        // Remove formatação do WhatsApp para validar apenas números
        const whatsappNumbers = formData.whatsapp.replace(/\D/g, '');
        return (
          formData.nomeEmpresa.trim() !== '' &&
          formData.nomeResponsavel.trim() !== '' &&
          whatsappNumbers.length === 11 &&
          formData.nicho.trim() !== ''
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

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mapear IDs de serviços para nomes legíveis
      const servicosNomes = formData.servicos.map((servicoId) => {
        const servico = servicos.find((s) => s.id === servicoId);
        return servico ? servico.nome : servicoId;
      });

      // Preparar dados para envio
      const dadosParaEnvio = {
        nomeEmpresa: formData.nomeEmpresa,
        nomeResponsavel: formData.nomeResponsavel,
        whatsapp: formData.whatsapp,
        nicho: formData.nicho,
        servicos: servicosNomes.join(', '),
        orcamento: formData.orcamento,
      };

      // Enviar para Formspree
      const response = await fetch('https://formspree.io/f/mkgdbrkz', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      if (response.ok) {
        // Sucesso - redirecionar para página de agradecimento
        navigate('/obrigado');
      } else {
        // Erro na resposta
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar formulário');
      }
    } catch (error) {
      // Erro na requisição ou na resposta
      console.error('Erro ao enviar formulário:', error);
      alert('Ops! Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efeitos de fundo decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-bwn-orange/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bwn-orange/5 rounded-full blur-3xl"
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

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo BWN */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/image/bwn_certo.png"
              alt="Logo BWN"
              className="h-20 md:h-24 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Barra de Progresso */}
        <div className="mb-8 glass rounded-full p-1">
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-bwn-orange to-orange-400 rounded-full glow-orange"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-3 text-sm text-gray-300 text-center font-medium">
            Etapa {step} de {totalSteps}
          </div>
        </div>

        {/* Container do Formulário */}
        <motion.div
          className="glass-strong rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Brilho sutil no topo */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bwn-orange/50 to-transparent" />
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
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    Escale sua empresa na Bahia com a BWN
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Junte-se às empresas que já faturaram mais de{' '}
                    <span className="text-bwn-orange font-bold bg-gradient-to-r from-bwn-orange to-orange-400 bg-clip-text text-transparent">R$ 500k</span>{' '}
                    conosco
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      name="nomeEmpresa"
                      value={formData.nomeEmpresa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 glass-input rounded-xl focus:outline-none focus:border-bwn-orange focus:ring-2 focus:ring-bwn-orange/30 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600"
                      placeholder="Digite o nome da sua empresa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Nome do Responsável
                    </label>
                    <input
                      type="text"
                      name="nomeResponsavel"
                      value={formData.nomeResponsavel}
                      onChange={handleNomeChange}
                      className="w-full px-4 py-3.5 glass-input rounded-xl focus:outline-none focus:border-bwn-orange focus:ring-2 focus:ring-bwn-orange/30 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleWhatsAppChange}
                      maxLength={15}
                      className="w-full px-4 py-3.5 glass-input rounded-xl focus:outline-none focus:border-bwn-orange focus:ring-2 focus:ring-bwn-orange/30 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600"
                      placeholder="(71) 99999-9999"
                    />
                    {formData.whatsapp && formData.whatsapp.replace(/\D/g, '').length !== 11 && (
                      <p className="text-red-400 text-xs mt-1">Digite o DDD + 9 dígitos</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Nicho
                    </label>
                    <input
                      type="text"
                      name="nicho"
                      value={formData.nicho}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 glass-input rounded-xl focus:outline-none focus:border-bwn-orange focus:ring-2 focus:ring-bwn-orange/30 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600"
                      placeholder="Ex: E-commerce, Saúde, Educação, etc."
                    />
                  </div>
                </div>

                <motion.button
                  onClick={handleNext}
                  disabled={!validateStep()}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255, 85, 0, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 glow-orange hover:glow-orange-strong"
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
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    O que sua empresa precisa hoje?
                  </h2>
                  <p className="text-gray-300">
                    Selecione um ou mais serviços
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicos.map((servico, index) => {
                    const isSelected = formData.servicos.includes(servico.id);
                    const isLastItem = index === servicos.length - 1;
                    const isOddCount = servicos.length % 2 !== 0;
                    return (
                      <motion.button
                        key={servico.id}
                        onClick={() => toggleServico(servico.id)}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`p-5 rounded-2xl border transition-all duration-300 text-left w-full ${
                          isSelected
                            ? 'border-bwn-orange/50 glass-card bg-bwn-orange/10 shadow-lg shadow-bwn-orange/30 glow-orange'
                            : 'border-white/10 glass-card hover:border-white/20 hover:bg-white/5'
                        } ${
                          isLastItem && isOddCount ? 'sm:col-span-2 sm:mx-auto' : ''
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
                    className="flex-1 glass border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <ArrowLeft size={20} />
                    Voltar
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    disabled={!validateStep()}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255, 85, 0, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 glow-orange hover:glow-orange-strong"
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
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Qual sua meta de investimento mensal?
                  </h2>
                  <p className="text-gray-300">
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
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-bwn-orange/50 glass-card bg-bwn-orange/10 shadow-lg shadow-bwn-orange/30 glow-orange'
                            : 'border-white/10 glass-card hover:border-white/20 hover:bg-white/5'
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
                    className="flex-1 glass border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <ArrowLeft size={20} />
                    Voltar
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!validateStep() || isLoading}
                    whileHover={!isLoading ? { scale: 1.02, boxShadow: "0 0 30px rgba(255, 85, 0, 0.5)" } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className="flex-1 bg-gradient-to-r from-bwn-orange to-orange-500 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 glow-orange hover:glow-orange-strong"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Finalizar
                        <ArrowRight size={20} />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default FormularioBWN;

