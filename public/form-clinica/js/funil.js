/* ─────────────────────────────────────────
   BWN Funil Clínica Médica — Navegação, coleta e envio
───────────────────────────────────────── */

/* ── Objeto global de respostas do lead ── */
window.dadosFunil = {
  operando:     '',
  faturamento:  '',
  gargalo:      '',
  investimento: '',
  nome:         '',
  clinica:      '',
  telefone:     '',
  cidade:       '',
};

/* ── Flag anti-duplo-envio ── */
let enviando = false;

/* ─────────────────────────────────────────
   ESCASSEZ AUTOMÁTICA
───────────────────────────────────────── */
(function atualizarEscassez() {
  const horariosPorDia = { 0:4, 1:4, 2:3, 3:2, 4:2, 5:1, 6:1 };
  const dia   = new Date().getDay();
  const n     = horariosPorDia[dia];
  const texto = n === 1
    ? 'Só resta <strong>1 horário disponível</strong> esta semana'
    : 'Só restam <strong>' + n + ' horários disponíveis</strong> esta semana';
  const el = document.getElementById('escassez');
  if (el) el.innerHTML = texto;
})();

/* ─────────────────────────────────────────
   CONTROLE DE FUNDO
───────────────────────────────────────── */
const SCREEN_BG = {
  'screen-welcome':   'white',
  'screen-p2':        'blue',
  'screen-p3':        'white',
  'screen-p4':        'blue',
  'screen-p5':        'white',
  'screen-p6':        'blue',
  'screen-p7':        'white',
  'screen-p8':        'blue',
  'screen-p9':        'white',
  'screen-final':     'blue',
  'screen-goodbye':   'white',
  'screen-goodbye-2': 'white',
};

function aplicarFundo(idTela) {
  document.body.classList.toggle('bg-alt', SCREEN_BG[idTela] === 'blue');
}

/* ─────────────────────────────────────────
   NAVEGAÇÃO
───────────────────────────────────────── */
function irPara(idAtual, idProximo) {
  const atual   = document.getElementById(idAtual);
  const proximo = document.getElementById(idProximo);

  atual.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  atual.style.opacity    = '0';
  atual.style.transform  = 'translateY(-12px)';
  aplicarFundo(idProximo);

  setTimeout(() => {
    atual.classList.add('hidden');
    atual.style.opacity   = '';
    atual.style.transform = '';

    proximo.classList.remove('hidden');
    proximo.style.opacity   = '0';
    proximo.style.transform = 'translateY(16px)';

    requestAnimationFrame(() => {
      proximo.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      proximo.style.opacity    = '1';
      proximo.style.transform  = 'translateY(0)';
    });
  }, 260);
}

/* ─────────────────────────────────────────
   MÚLTIPLA ESCOLHA
───────────────────────────────────────── */
function comecar() {
  irPara('screen-welcome', 'screen-p2');
}

/* P2: Já opera? */
function responderP2(opcao, el) {
  marcarOpcao('#screen-p2', el);
  dadosFunil.operando = opcao === 'A' ? 'Sim, já estou atendendo' : 'Ainda não';

  setTimeout(() => {
    opcao === 'A'
      ? irPara('screen-p2', 'screen-p3')
      : irPara('screen-p2', 'screen-goodbye');
  }, 320);
}

/* P3: Faturamento */
function responderP3(opcao, el) {
  marcarOpcao('#screen-p3', el);
  const mapa = {
    A: 'Até R$ 15.000',
    B: 'Entre R$ 15.000 e R$ 60.000',
    C: 'Acima de R$ 60.000',
  };
  dadosFunil.faturamento = mapa[opcao];

  setTimeout(() => {
    opcao === 'A'
      ? irPara('screen-p3', 'screen-goodbye-2')
      : irPara('screen-p3', 'screen-p4');
  }, 320);
}

/* P4: Gargalo (todas avançam) */
function responderP4(el) {
  marcarOpcao('#screen-p4', el);
  dadosFunil.gargalo = el.textContent.trim();

  setTimeout(() => irPara('screen-p4', 'screen-p5'), 320);
}

/* P5: Fit financeiro */
function responderP5(opcao, el) {
  marcarOpcao('#screen-p5', el);
  dadosFunil.investimento = opcao === 'A'
    ? 'Sim, quero atrair mais pacientes para minha clínica'
    : 'Não está no meu momento agora';

  setTimeout(() => {
    opcao === 'A'
      ? irPara('screen-p5', 'screen-p6')
      : irPara('screen-p5', 'screen-goodbye-2');
  }, 320);
}

function marcarOpcao(seletor, el) {
  document.querySelectorAll(seletor + ' .option-btn')
    .forEach(btn => btn.classList.remove('selected'));
  el.classList.add('selected');
}

/* ─────────────────────────────────────────
   INPUTS DE TEXTO
───────────────────────────────────────── */
function validarInput(inputId, btnId) {
  const val = document.getElementById(inputId).value.trim();
  document.getElementById(btnId).disabled = val.length < 2;
}

/* P6: Nome completo */
function avancarP6() {
  const nome = document.getElementById('input-nome').value.trim();
  if (!validarCampo(nome, 'hint-nome', 'input-nome')) return;
  dadosFunil.nome = nome;
  irPara('screen-p6', 'screen-p7');
}

/* P7: Nome da clínica */
function avancarP7() {
  const clinica = document.getElementById('input-clinica').value.trim();
  if (!validarCampo(clinica, 'hint-clinica', 'input-clinica')) return;
  dadosFunil.clinica = clinica;
  irPara('screen-p7', 'screen-p8');
}

/* P8: Telefone com máscara */
function mascaraTelefone(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 11);
  if      (v.length >= 7) v = '(' + v.substring(0,2) + ') ' + v.substring(2,7) + '-' + v.substring(7);
  else if (v.length >= 3) v = '(' + v.substring(0,2) + ') ' + v.substring(2);
  else if (v.length >= 1) v = '(' + v;
  input.value = v;
  document.getElementById('btn-p8').disabled = v.replace(/\D/g,'').length < 10;
}

function avancarP8() {
  const tel  = document.getElementById('input-telefone').value.trim();
  const nums = tel.replace(/\D/g, '');
  if (nums.length < 10) {
    document.getElementById('hint-telefone').classList.remove('hidden');
    document.getElementById('input-telefone').focus();
    return;
  }
  document.getElementById('hint-telefone').classList.add('hidden');
  dadosFunil.telefone = tel;
  irPara('screen-p8', 'screen-p9');
}

/* P9: Cidade → dispara envio */
function avancarP9() {
  if (enviando) return;
  const cidade = document.getElementById('input-cidade').value.trim();
  if (!validarCampo(cidade, 'hint-cidade', 'input-cidade')) return;
  dadosFunil.cidade = cidade;

  const primeiroNome = dadosFunil.nome.split(' ')[0];
  if (primeiroNome) {
    document.getElementById('final-titulo').textContent = 'Ótimo, ' + primeiroNome + '!';
  }

  if (typeof fbq === 'function') {
    fbq('track', 'Subscribe');
  }

  enviarEmail(dadosFunil);
}

function validarCampo(valor, hintId, inputId) {
  if (valor.length >= 2) {
    document.getElementById(hintId).classList.add('hidden');
    return true;
  }
  document.getElementById(hintId).classList.remove('hidden');
  document.getElementById(inputId).focus();
  return false;
}

/* ─────────────────────────────────────────
   ENVIO DE E-MAIL (EmailJS)
───────────────────────────────────────── */
function enviarEmail(dados) {
  enviando = true;

  /* Link WhatsApp com mensagem personalizada para clínica */
  const numeroLimpo = dados.telefone.replace(/\D/g, '');
  const mensagem = encodeURIComponent(
    'Olá, ' + dados.nome + '! 👋\n' +
    'Aqui é o Carlos, da BWN.\n\n' +
    'Vi que você preencheu nosso formulário e fiquei animado com o potencial da ' +
    dados.clinica + '!\n' +
    'Que tal a gente marcar uma conversa rápida para entender melhor o momento da ' +
    'sua clínica e ver como podemos atrair mais pacientes para você?\n\n' +
    'Quando fica bom para você?'
  );
  const linkWhatsApp = 'https://wa.me/55' + numeroLimpo + '?text=' + mensagem;

  /* Spinner no botão */
  const btn = document.getElementById('btn-p9');
  btn.classList.add('loading');
  btn.innerHTML = '<span class="spinner"></span> Enviando…';

  emailjs.send('service_5omrmyf', 'template_3tormk9', {
    nome:         dados.nome,
    clinica:      dados.clinica,
    telefone:     dados.telefone,
    cidade:       dados.cidade,
    operando:     dados.operando,
    faturamento:  dados.faturamento,
    gargalo:      dados.gargalo,
    investimento: dados.investimento,
    whatsapp:     linkWhatsApp,
  })
  .then(() => {
    console.log('✅ E-mail enviado com sucesso!');
    irPara('screen-p9', 'screen-final');
  })
  .catch((erro) => {
    console.error('❌ Erro ao enviar e-mail:', erro);
    enviando = false;
    btn.classList.remove('loading');
    btn.innerHTML = 'Enviar &rarr;';
    document.getElementById('hint-cidade').textContent =
      'Houve um erro no envio. Tente novamente ou entre em contato direto.';
    document.getElementById('hint-cidade').classList.remove('hidden');
  });
}