/**
 * analytics.js — Puente entre los atributos data-gtm y el dataLayer de GTM
 * Spec: docs/architecture.md §9 (eventos snake_case) y cada kb/docs/*.md §GTM
 *
 * Las plantillas marcan los elementos clicables con data-gtm="nombre_evento".
 * Un solo listener delegado en document empuja cada clic como
 * { event, gtm_label, gtm_url }: cubre también los enlaces que se crean
 * después de cargar (p. ej. la tabla de contenidos de toc.js).
 *
 * El acordeón de FAQs NO usa data-gtm: empuja su propio evento con la
 * pregunta abierta desde faq-accordion.js, así que no se duplica aquí.
 *
 * Sin el contenedor GTM cargado los eventos solo se acumulan en
 * window.dataLayer (se puede inspeccionar en consola para QA).
 */

const Analytics = {
  init() {
    window.dataLayer = window.dataLayer || [];

    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-gtm]');
      if (!el) return;

      window.dataLayer.push({
        event: el.dataset.gtm,
        gtm_label: (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100),
        gtm_url: el.getAttribute('href') || undefined
      });
    });
  }
};

export default Analytics;
