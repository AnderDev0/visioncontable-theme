/*! nyo-credit v1.0.0 · N&O Holding · https://nyoholding.com
 * Crédito animado "Diseño y desarrollo N&O" para footers de sitios de clientes.
 * Web Component sin dependencias: HTML, Astro, React/Next, Vue, WordPress.
 *
 * Uso recomendado (SEO-safe: el enlace existe en el HTML aunque no cargue JS):
 *   <nyo-credit variant="mono">
 *     <a href="https://nyoholding.com" rel="nofollow">Diseño y desarrollo<span class="nyo-credit__sr"> N&amp;O Holding</span></a>
 *   </nyo-credit>
 *   <script src="/nyo-credit.js" defer></script>
 *
 * Atributos:
 *   variant = "mono" (defecto, hereda el color del footer) | "brand" (isotipos a color)
 *   label   = texto si el componente genera el enlace (defecto "Diseño y desarrollo")
 *   href    = URL si el componente genera el enlace (defecto https://nyoholding.com)
 *   static  = sin animación (muestra N&O completo)
 */
(() => {
  if (typeof window === 'undefined' || !window.customElements || customElements.get('nyo-credit')) return;

  const DEFAULT_HREF = 'https://nyoholding.com';
  const DEFAULT_LABEL = 'Diseño y desarrollo';
  const BRAND_NAME = 'N&O Holding';

  /* Isotipos vectoriales oficiales: ISOTIPO_N_O_N_Azul.svg · ISOTIPO_N_O___Azul.svg · ISOTIPO_N_O.svg */
  const P_N = 'M5352 17467 c-518 -518 -942 -945 -942 -950 0 -4 424 -7 942 -7 l943 0 942 942 c519 519 943 946 943 950 0 5 -424 8 -943 8 l-942 0 -943 -943z M8178 17463 l-937 -948 2363 -3 2363 -2 2829 -2854 2829 -2854 7 372 c4 204 8 1488 10 2853 l3 2483 942 0 942 0 518 512 c285 281 710 703 944 936 l427 423 -2842 -7 c-1562 -3 -2844 -9 -2848 -13 -7 -6 2 -1611 17 -3126 l6 -610 -1894 1893 -1895 1892 -1424 0 -1424 0 -936 -947z M10074 11789 l6 -2836 -907 -6 c-500 -4 -1139 -7 -1422 -7 l-514 0 -941 -937 c-518 -516 -942 -941 -944 -945 -2 -5 1486 -8 3307 -8 l3311 0 0 1892 0 1893 1893 -1893 1892 -1892 2840 0 2840 0 -950 950 -950 950 -1893 0 -1892 0 -2842 2838 -2841 2837 7 -2836z M3455 8000 l-950 -950 948 0 948 0 945 942 c519 518 944 945 944 950 0 4 -424 8 -943 8 l-942 0 -950 -950z';
  const P_A = 'M12250 24564 c-1935 -54 -3835 -574 -5509 -1509 -997 -556 -1830 -1185 -2642 -1995 -562 -560 -965 -1038 -1396 -1655 -498 -714 -947 -1541 -1276 -2350 -444 -1093 -731 -2288 -831 -3455 -37 -423 -41 -526 -40 -995 1 -471 10 -727 40 -1075 114 -1357 434 -2613 990 -3880 106 -242 390 -802 534 -1053 213 -373 492 -809 687 -1074 620 -845 1218 -1495 1971 -2142 1074 -923 2369 -1676 3722 -2164 1609 -581 3299 -806 5050 -672 2092 161 4169 904 5895 2108 1891 1320 3366 3146 4247 5257 395 945 664 1928 807 2950 116 823 143 1598 86 2470 -149 2275 -924 4421 -2263 6270 -965 1331 -2225 2477 -3637 3307 -766 450 -1513 788 -2345 1061 -979 322 -1955 509 -3010 577 -222 14 -857 25 -1080 19z m2970 -4946 c957 -915 1856 -1825 2763 -2798 l266 -285 -572 -572 -572 -573 -1140 0 -1140 1 572 570 573 570 -538 559 -537 559 -2286 1 -2286 0 -562 -575 -562 -575 1962 -1978 c1080 -1087 2218 -2234 2531 -2547 l568 -570 -570 -570 -570 -570 -1428 1428 -1429 1429 -1054 -1089 c-580 -598 -1081 -1117 -1114 -1152 l-60 -64 1145 -1138 1145 -1139 1140 0 1140 0 1709 1716 1709 1716 -566 -8 c-337 -4 -567 -3 -567 2 0 5 255 264 568 576 l567 567 1138 -6 1137 -6 0 -1141 0 -1141 -565 -565 -565 -565 0 570 0 570 -2283 -2283 -2282 -2282 -1139 0 -1138 0 -2284 2276 c-1256 1252 -2284 2280 -2284 2285 0 4 763 783 1695 1731 l1695 1723 -583 585 c-320 322 -823 827 -1117 1123 l-535 537 1705 1705 1705 1705 2285 0 2285 -1 325 -311z m2765 -11938 l1430 -1430 -1175 0 -1175 1 -770 805 c-423 442 -794 832 -824 865 l-55 60 565 565 c310 310 566 564 569 564 3 0 649 -643 1435 -1430z';
  const P_O = 'M6045 12404 c-1145 -68 -2148 -398 -3065 -1007 -1411 -937 -2378 -2447 -2629 -4107 -59 -394 -76 -643 -67 -1030 6 -305 12 -391 47 -670 127 -1018 520 -1998 1137 -2830 246 -332 585 -698 894 -967 1279 -1110 2958 -1632 4643 -1442 1204 135 2329 625 3256 1416 231 198 579 556 771 793 673 835 1114 1834 1273 2885 43 286 56 450 62 785 6 330 -3 544 -33 810 -144 1301 -720 2537 -1619 3480 -502 525 -1050 933 -1680 1247 -704 352 -1411 551 -2210 623 -121 11 -668 21 -780 14z m665 -2349 c728 -86 1375 -368 1897 -827 599 -526 1006 -1222 1167 -1993 34 -165 64 -385 72 -535 l7 -125 -59 55 c-32 30 -248 241 -479 470 -231 228 -467 461 -525 517 l-105 101 -157 7 -157 7 -47 75 c-154 247 -415 515 -674 692 -399 272 -926 427 -1385 407 -771 -34 -1489 -442 -1922 -1092 l-56 -84 -151 0 -151 0 -583 -576 c-321 -317 -585 -574 -588 -572 -6 6 12 252 26 363 48 372 156 749 308 1075 204 438 524 868 877 1179 451 398 895 633 1462 775 201 51 358 75 653 100 89 8 447 -4 570 -19z m-165 -2680 c161 -41 305 -126 422 -248 175 -183 251 -386 240 -646 -5 -134 -31 -239 -85 -346 -218 -433 -745 -609 -1177 -393 -177 89 -324 243 -406 425 -109 243 -96 552 33 783 125 223 354 387 605 435 94 18 280 13 368 -10z m-2535 -1548 c67 -397 221 -747 468 -1067 91 -118 307 -331 427 -421 344 -258 716 -412 1140 -470 119 -17 446 -17 565 -1 755 105 1395 529 1760 1165 183 320 280 642 313 1040 l12 147 515 -515 514 -514 -23 -73 c-289 -912 -898 -1636 -1727 -2051 -381 -191 -812 -313 -1287 -363 -190 -20 -621 -14 -796 11 -1012 143 -1843 641 -2419 1449 -202 283 -397 664 -493 964 l-23 73 509 509 510 510 6 -132 c4 -73 17 -191 29 -261z';

  /* Paleta del manual: Oxford Blue #001333 · Sky Blue #68E1FE · Negro #000000 · aro #D6D6D6 */
  const DEFS = `<svg xmlns="http://www.w3.org/2000/svg" id="nyo-credit-defs" width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
<defs>
<g id="nyo-cr-pN" transform="translate(0,2517) scale(0.1,-0.1)"><path d="${P_N}"/></g>
<g id="nyo-cr-pA" transform="translate(0,2517) scale(0.1,-0.1)"><path d="${P_A}"/></g>
<g id="nyo-cr-pO" transform="translate(0,1267) scale(0.1,-0.1)"><path d="${P_O}"/></g>
<clipPath id="nyo-cr-cA"><circle cx="1258" cy="1258" r="1170"/></clipPath>
<clipPath id="nyo-cr-cO"><circle cx="635" cy="633" r="590"/></clipPath>
<mask id="nyo-cr-mA" maskUnits="userSpaceOnUse" x="0" y="0" width="2517" height="2517"><rect width="2517" height="2517" fill="#fff"/><use href="#nyo-cr-pA" fill="#000"/></mask>
<mask id="nyo-cr-mO" maskUnits="userSpaceOnUse" x="0" y="0" width="1271" height="1267"><rect width="1271" height="1267" fill="#fff"/><use href="#nyo-cr-pO" fill="#000"/></mask>
<g id="nyo-cr-monoN"><use href="#nyo-cr-pN" fill="currentColor"/></g>
<g id="nyo-cr-monoA"><rect width="2517" height="2517" fill="currentColor" clip-path="url(#nyo-cr-cA)" mask="url(#nyo-cr-mA)"/></g>
<g id="nyo-cr-monoO"><rect width="1271" height="1267" fill="currentColor" clip-path="url(#nyo-cr-cO)" mask="url(#nyo-cr-mO)"/></g>
<g id="nyo-cr-brandN"><circle cx="1261" cy="1258" r="1258" fill="#D6D6D6"/><circle cx="1261" cy="1258" r="1195" fill="#68E1FE"/><use href="#nyo-cr-pN" fill="#001333"/></g>
<g id="nyo-cr-brandA"><circle cx="1258" cy="1258" r="1258" fill="#68E1FE"/><use href="#nyo-cr-pA" fill="#001333"/></g>
<g id="nyo-cr-brandO"><circle cx="635" cy="633" r="633" fill="#D6D6D6"/><use href="#nyo-cr-pO" fill="#000000"/></g>
</defs></svg>`;

  const GLYPHS = {
    mono: {
      N: '<svg viewBox="220 640 2010 1200" style="aspect-ratio:2010/1200" focusable="false"><use href="#nyo-cr-monoN"/></svg>',
      A: '<svg viewBox="560 500 1420 1420" style="aspect-ratio:1" focusable="false"><use href="#nyo-cr-monoA"/></svg>',
      O: '<svg viewBox="260 240 750 780" style="aspect-ratio:750/780" focusable="false"><use href="#nyo-cr-monoO"/></svg>'
    },
    brand: {
      N: '<svg viewBox="0 0 2523 2517" focusable="false"><use href="#nyo-cr-brandN"/></svg>',
      A: '<svg viewBox="0 0 2517 2517" focusable="false"><use href="#nyo-cr-brandA"/></svg>',
      O: '<svg viewBox="0 0 1271 1267" focusable="false"><use href="#nyo-cr-brandO"/></svg>'
    }
  };

  const CSS = `
nyo-credit{display:inline-flex;align-items:center;vertical-align:middle;color:inherit;line-height:1}
nyo-credit .nyo-credit__link{display:inline-flex;align-items:center;gap:.4em;color:inherit;text-decoration:none;white-space:nowrap}
nyo-credit .nyo-credit__link:focus-visible{outline:2px solid currentColor;outline-offset:3px;border-radius:2px}
.nyo-credit__sr{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important;border:0!important}
nyo-credit .nyo-credit__mark{display:inline-flex;align-items:center;justify-content:flex-end;height:1.3em;flex:none}
nyo-credit .nyo-credit__g{display:flex;justify-content:flex-end;align-items:center;height:100%;width:0;overflow:hidden;transition:width .55s cubic-bezier(.4,0,.2,1),opacity .4s}
nyo-credit .nyo-credit__g svg{display:block;height:100%;width:auto;flex:none;clip-path:inset(0 100% 0 0);transition:clip-path .6s cubic-bezier(.4,0,.2,1)}
nyo-credit .nyo-credit__g.is-w{width:var(--w)}
nyo-credit .nyo-credit__g.is-v svg{clip-path:inset(0 0 0 0)}
nyo-credit .nyo-credit__g.is-h{opacity:0}
nyo-credit[data-variant="mono"] .nyo-credit__g--N{--w:calc(1.3em*2010/1200 + .06em)}
nyo-credit[data-variant="mono"] .nyo-credit__g--A{--w:calc(1.3em + .06em)}
nyo-credit[data-variant="mono"] .nyo-credit__g--O{--w:calc(1.3em*750/780 + .06em)}
nyo-credit[data-variant="brand"] .nyo-credit__mark{height:1.55em}
nyo-credit[data-variant="brand"] .nyo-credit__g{--w:1.75em}
nyo-credit[data-variant="brand"] .nyo-credit__g svg{width:1.55em;height:1.55em}
nyo-credit[static] .nyo-credit__g{width:var(--w);opacity:1;transition:none}
nyo-credit[static] .nyo-credit__g svg{clip-path:none;transition:none}
@media (prefers-reduced-motion:reduce){
  nyo-credit .nyo-credit__g{width:var(--w)!important;opacity:1!important;transition:none!important}
  nyo-credit .nyo-credit__g svg{clip-path:none!important;transition:none!important}
}`;

  const ON = { w: 1, v: 1, h: 0 };
  const OFF = { w: 0, v: 0, h: 1 };
  const RESET = { w: 0, v: 0, h: 0 };
  const CYCLE_MS = 8800;
  /* Secuencia N → & → O · repliegue a la derecha · intercalado N / & / O · vuelve a desplegar */
  const STEPS = [
    [0, g => set(g.N, ON)],
    [380, g => set(g.A, ON)],
    [760, g => set(g.O, ON)],
    [3200, g => { set(g.N, OFF); set(g.A, OFF); }],
    [4600, g => { set(g.O, OFF); set(g.N, ON); }],
    [6000, g => { set(g.N, OFF); set(g.A, ON); }],
    [7400, g => { set(g.A, OFF); set(g.O, ON); }]
  ];

  function set(el, s) {
    if (!el) return;
    el.classList.toggle('is-w', !!s.w);
    el.classList.toggle('is-v', !!s.v);
    el.classList.toggle('is-h', !!s.h);
  }

  function ensureShared() {
    if (!document.getElementById('nyo-credit-styles')) {
      const style = document.createElement('style');
      style.id = 'nyo-credit-styles';
      style.textContent = CSS;
      (document.head || document.documentElement).appendChild(style);
    }
    if (!document.getElementById('nyo-credit-defs') && document.body) {
      document.body.insertAdjacentHTML('afterbegin', DEFS);
    }
  }

  const reducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function addSr(link) {
    const sr = document.createElement('span');
    sr.className = 'nyo-credit__sr';
    sr.textContent = ' ' + BRAND_NAME;
    link.appendChild(sr);
  }

  class NyoCredit extends HTMLElement {
    static get observedAttributes() { return ['variant', 'label', 'href', 'static']; }

    connectedCallback() {
      ensureShared();
      this._render();
      this._observe();
    }

    disconnectedCallback() {
      this._stop();
      if (this._io) this._io.disconnect();
      if (this._onVis) document.removeEventListener('visibilitychange', this._onVis);
      this._io = this._onVis = null;
    }

    attributeChangedCallback() {
      if (!this.isConnected || !this._link) return;
      this._stop();
      this._render();
      if (this._visible && !document.hidden) this._start();
    }

    _render() {
      const variant = this.getAttribute('variant') === 'brand' ? 'brand' : 'mono';
      this.dataset.variant = variant;

      let link = this.querySelector('a');
      if (!link) {
        link = document.createElement('a');
        link.setAttribute('data-nyo-generated', '');
        this.appendChild(link);
      }
      if (link.hasAttribute('data-nyo-generated')) {
        link.href = this.getAttribute('href') || DEFAULT_HREF;
        link.textContent = this.getAttribute('label') || DEFAULT_LABEL;
        addSr(link);
      }

      /* Guardas SEO: enlace de plantilla siempre nofollow y con nombre de marca accesible */
      const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('nofollow');
      link.setAttribute('rel', [...rel].join(' '));
      if (!link.querySelector('.nyo-credit__sr') && !/n&o/i.test(link.textContent)) addSr(link);
      link.classList.add('nyo-credit__link');

      const old = link.querySelector('.nyo-credit__mark');
      if (old) old.remove();
      const mark = document.createElement('span');
      mark.className = 'nyo-credit__mark';
      mark.setAttribute('aria-hidden', 'true');
      const G = GLYPHS[variant];
      mark.innerHTML =
        `<span class="nyo-credit__g nyo-credit__g--N">${G.N}</span>` +
        `<span class="nyo-credit__g nyo-credit__g--A">${G.A}</span>` +
        `<span class="nyo-credit__g nyo-credit__g--O">${G.O}</span>`;
      link.appendChild(mark);

      this._link = link;
      this._g = {
        N: mark.querySelector('.nyo-credit__g--N'),
        A: mark.querySelector('.nyo-credit__g--A'),
        O: mark.querySelector('.nyo-credit__g--O')
      };
      if (this._isStatic()) Object.values(this._g).forEach(el => set(el, ON));
    }

    _isStatic() { return this.hasAttribute('static') || reducedMotion(); }

    _observe() {
      this._visible = true;
      if ('IntersectionObserver' in window) {
        this._io = new IntersectionObserver(entries => {
          this._visible = entries.some(e => e.isIntersecting);
          this._visible && !document.hidden ? this._start() : this._stop();
        });
        this._io.observe(this);
      } else {
        this._start();
      }
      this._onVis = () => (document.hidden ? this._stop() : this._visible && this._start());
      document.addEventListener('visibilitychange', this._onVis);
    }

    _start() {
      if (this._running || this._isStatic()) return;
      this._running = true;
      Object.values(this._g).forEach(el => set(el, RESET));
      this._cycle();
    }

    _cycle() {
      const g = this._g;
      this._timers = STEPS.map(([t, fn]) => setTimeout(() => fn(g), t));
      this._timers.push(setTimeout(() => this._running && this._cycle(), CYCLE_MS));
    }

    _stop() {
      this._running = false;
      (this._timers || []).forEach(clearTimeout);
      this._timers = [];
    }
  }

  customElements.define('nyo-credit', NyoCredit);
})();
