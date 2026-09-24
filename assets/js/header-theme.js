/**
 * header-theme.js
 * Adapta el glassmorphism del header según la sección detrás del header.
 * El logo se mantiene fijo (variante "positivo") — no cambia de color.
 * Usa data-theme="light|warm|dark" en el elemento #site-header.
 */

// Mapeo de sección → tema (orden: más específico primero)
const SECTION_CONFIG = [
  { selector: '.site-footer',      theme: 'dark' },
  { selector: '.home-situations',  theme: 'warm' },
  { selector: '.home-value',       theme: 'warm' },
  { selector: '.section--bg-warm', theme: 'warm' },
  { selector: '.home-trust',       theme: 'light' },
  { selector: '.home-services',    theme: 'light' },
  { selector: '.home-process',     theme: 'light' },
];

const DEFAULT = { theme: 'light' };

const HeaderTheme = {
  header:       null,
  watchList:    [],
  currentTheme: null,
  ticking:      false,

  init() {
    this.header = document.querySelector('#site-header');
    if (!this.header) return;

    // Construir lista de elementos a observar
    SECTION_CONFIG.forEach(cfg => {
      document.querySelectorAll(cfg.selector).forEach(el => {
        this.watchList.push({ el, theme: cfg.theme });
      });
    });

    if (!this.watchList.length) return;

    this._update();
    window.addEventListener('scroll', () => this._schedule(), { passive: true });
    window.addEventListener('resize', () => this._schedule(), { passive: true });
  },

  // _update() lee getBoundingClientRect() de cada sección observada, y eso obliga
  // al navegador a recalcular layout. Atado directamente al evento de scroll se
  // ejecutaba varias veces por frame en móvil (jank e INP alto). Con rAF se hace
  // como mucho una vez por frame, justo antes de pintar.
  _schedule() {
    if (this.ticking) return;
    this.ticking = true;
    window.requestAnimationFrame(() => {
      this.ticking = false;
      this._update();
    });
  },

  _getActive() {
    // El punto de detección es 1px por debajo del borde inferior del header
    const triggerY = this.header.getBoundingClientRect().bottom + 1;

    const match = this.watchList.find(({ el }) => {
      const r = el.getBoundingClientRect();
      return r.top <= triggerY && r.bottom > triggerY;
    });

    return match || DEFAULT;
  },

  _update() {
    const active = this._getActive();
    if (active.theme === this.currentTheme) return; // sin cambio, no hacer nada
    this.currentTheme = active.theme;

    // Actualizar atributo de tema en el header (glassmorphism claro/cálido/oscuro)
    this.header.dataset.theme = active.theme;
  }
};

export default HeaderTheme;
