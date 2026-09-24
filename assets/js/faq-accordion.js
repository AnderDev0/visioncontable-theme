/**
 * faq-accordion.js — Acordeón de FAQs accesible
 * Spec: kb/docs/home-specifications.md, services-*.md, about-katerinn.md
 * Requisitos: aria-expanded, aria-controls, aria-hidden, keyboard navigation
 */

const FaqAccordion = {
  init() {
    const accordions = document.querySelectorAll('.faq-accordion');
    accordions.forEach(accordion => this._initAccordion(accordion));
  },

  _initAccordion(accordion) {
    const triggers = accordion.querySelectorAll('.accordion__trigger');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => this._toggle(trigger));

      // Navegación por teclado: Arriba/Abajo entre triggers
      trigger.addEventListener('keydown', (e) => {
        const allTriggers = [...accordion.querySelectorAll('.accordion__trigger')];
        const idx = allTriggers.indexOf(trigger);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          allTriggers[Math.min(idx + 1, allTriggers.length - 1)]?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          allTriggers[Math.max(idx - 1, 0)]?.focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          allTriggers[0]?.focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          allTriggers[allTriggers.length - 1]?.focus();
        }
      });
    });
  },

  _toggle(trigger) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    if (!panel) return;

    if (isExpanded) {
      this._close(trigger, panel);
    } else {
      this._open(trigger, panel);
    }

    // GTM event
    if (!isExpanded) {
      const gtmEvent = trigger.closest('[data-gtm-category]')?.dataset.gtmCategory || 'faq_open';
      window.dataLayer?.push({ event: gtmEvent, faq_question: trigger.textContent.trim() });
    }
  },

  _open(trigger, panel) {
    trigger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  },

  _close(trigger, panel) {
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    panel.style.maxHeight = '0';
  }
};

export default FaqAccordion;
