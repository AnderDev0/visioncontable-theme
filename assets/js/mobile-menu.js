/**
 * mobile-menu.js — Drawer de navegación móvil
 * Spec: kb/docs/header-specifications.md
 * Funcionalidad: toggle drawer, focus trap, aria-expanded, overlay
 */

const MobileMenu = {
  btn: null,
  drawer: null,
  overlay: null,
  closeBtn: null,
  focusableSelectors: 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  // Referencia estable del listener: .bind() devuelve una función nueva cada vez,
  // así que sin esto removeEventListener nunca acertaba y cada apertura del
  // drawer dejaba un listener de keydown extra acumulado.
  boundTrapFocus: null,

  init() {
    this.btn = document.getElementById('mobile-menu-btn');
    this.drawer = document.getElementById('mobile-drawer');
    this.overlay = document.getElementById('mobile-overlay');
    this.closeBtn = document.getElementById('mobile-drawer-close');

    if (!this.btn || !this.drawer) return;

    this.boundTrapFocus = this._trapFocus.bind(this);

    this.btn.addEventListener('click', () => this.open());
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) this.close();
    });

    // Sticky header: añadir sombra al hacer scroll
    const header = document.getElementById('site-header');
    if (header) {
      const observer = new IntersectionObserver(
        ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
        { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
      );
      // Observar un sentinel invisible al inicio del body
      const sentinel = document.createElement('div');
      sentinel.style.cssText = 'height:1px;width:100%;position:absolute;top:0;pointer-events:none;';
      document.body.prepend(sentinel);
      observer.observe(sentinel);
    }
  },

  isOpen() {
    return this.drawer.classList.contains('is-open');
  },

  open() {
    this.drawer.classList.add('is-open');
    this.overlay?.classList.add('is-visible');
    this.btn.setAttribute('aria-expanded', 'true');
    this.drawer.setAttribute('aria-hidden', 'false');
    this.drawer.removeAttribute('inert');
    document.body.style.overflow = 'hidden';

    // Foco al primer elemento del drawer
    const firstFocusable = this.drawer.querySelector(this.focusableSelectors);
    firstFocusable?.focus();

    // Activar focus trap
    this.drawer.addEventListener('keydown', this.boundTrapFocus);
  },

  close() {
    this.drawer.classList.remove('is-open');
    this.overlay?.classList.remove('is-visible');
    this.btn.setAttribute('aria-expanded', 'false');
    this.drawer.setAttribute('aria-hidden', 'true');
    this.drawer.setAttribute('inert', '');
    document.body.style.overflow = '';

    // Devolver foco al botón hamburguesa
    this.btn.focus();

    this.drawer.removeEventListener('keydown', this.boundTrapFocus);
  },

  _trapFocus(e) {
    if (e.key !== 'Tab') return;

    const focusable = [...this.drawer.querySelectorAll(this.focusableSelectors)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
};

export default MobileMenu;
