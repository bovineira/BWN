# Formulário BWN - Componente React Moderno

Formulário multi-etapas moderno e interativo desenvolvido para a BWN, agência de marketing digital focada em performance na Bahia.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações para React
- **Lucide React** - Ícones modernos e leves

## 📦 Instalação

As dependências já foram instaladas. Se precisar reinstalar:

```bash
npm install
```

## 🎨 Características do Design

- **Paleta de Cores:**
  - Fundo: Preto (#000000 / #0a0a0a)
  - Texto: Branco (#ffffff)
  - Acentos: Laranja Vibrante (#FF5500)

- **Estética:** Minimalista, High-Ticket, Futurista e Limpa
- **Tipografia:** Inter (Google Fonts)
- **Responsivo:** Mobile-first design

## 🎯 Funcionalidades

### Etapa 1: Dados Básicos
- Nome da Empresa
- Nome do Responsável
- WhatsApp
- Validação de campos obrigatórios

### Etapa 2: Seleção de Serviços
- Cards interativos com múltipla seleção
- Serviços disponíveis:
  - Tráfego Pago
  - Edição de Vídeo
  - CRM
  - Social Media
  - Web Design

### Etapa 3: Orçamento
- Seleção de faixa de investimento mensal
- Opções: Até R$ 2k, R$ 2k - R$ 5k, R$ 5k - R$ 10k, Acima de R$ 10k

### Etapa 4: Finalização
- Animação de sucesso
- Mensagem de confirmação
- Efeitos visuais com confetes

## 🎬 Animações e Interações

- Transições suaves entre etapas (fade-in/slide)
- Barra de progresso animada
- Hover effects nos botões e cards
- Micro-interações com Framer Motion
- Animações de escala e rotação

## 🚀 Como Executar

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📱 Responsividade

O componente é totalmente responsivo e otimizado para:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## 🎨 Customização

As cores e estilos podem ser customizados no arquivo `tailwind.config.js`:

```javascript
colors: {
  'bwn-orange': '#FF5500',
  'bwn-black': '#000000',
  'bwn-dark': '#0a0a0a',
}
```

## 📝 Estrutura de Arquivos

```
BWN/
├── src/
│   ├── components/
│   │   └── FormularioBWN.jsx  # Componente principal
│   ├── App.jsx                 # Componente raiz
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos globais
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔧 Próximos Passos

Para integrar com uma API, modifique a função `handleSubmit` no componente `FormularioBWN.jsx`:

```javascript
const handleSubmit = async () => {
  try {
    const response = await fetch('sua-api-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // Tratar resposta
  } catch (error) {
    // Tratar erro
  }
};
```

---

Desenvolvido com ❤️ para a BWN

