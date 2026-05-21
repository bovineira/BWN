import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GTM_ID = 'GTM-PWD74GDG';
const SCRIPT_ID = 'gtm-bwn-parent-snippet';

/**
 * Em /agencia o conteúdo com links fica em um iframe (bwn_lp_v3.html), onde o GTM
 * precisa rodar para acionadores de clique em links. No documento pai o GTM não
 * “vê” cliques dentro do iframe — então aqui não injetamos GTM na rota /agencia.
 */
export default function GtmParentShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    const removeParentGtm = () => {
      document.getElementById(SCRIPT_ID)?.remove();
      document.querySelectorAll(`script[src*="googletagmanager.com/gtm.js?id=${GTM_ID}"]`).forEach((el) => el.remove());
      const ns = document.getElementById('gtm-bwn-parent-noscript');
      ns?.remove();
    };

    // "/" só redireciona para /agencia — não injetar GTM no pai (LP está no iframe).
    const noParentGtm = pathname === '/agencia' || pathname === '/form-delivery' || pathname === '/';
    if (noParentGtm) {
      removeParentGtm();
      return;
    }

    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
    document.head.appendChild(script);

    if (!document.getElementById('gtm-bwn-parent-noscript')) {
      const noscript = document.createElement('noscript');
      noscript.id = 'gtm-bwn-parent-noscript';
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, [pathname]);

  return null;
}
