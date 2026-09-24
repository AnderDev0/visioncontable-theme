/**
 * reveal.js — Revelado al entrar en pantalla, en ambos sentidos del scroll.
 *
 * Marca `[data-reveal]` con `.is-revealed` cuando el elemento entra en una
 * franja cómoda del viewport, y se lo quita cuando sale por completo, para que
 * la animación vuelva a ocurrir si el usuario regresa (bajando o subiendo).
 *
 * Se usan DOS observadores a propósito:
 *   - reveal: con la franja recortada por abajo, para que dispare cuando el
 *     bloque ya se ve de verdad y no al asomar el primer pixel.
 *   - reset: contra el viewport real, para reiniciar sólo cuando el bloque
 *     salió del todo. Si se reiniciara con la franja recortada, un scroll
 *     mínimo lo apagaría estando aún visible (parpadeo).
 *
 * El estado inicial (oculto) sólo se aplica si este script corrió, gracias al
 * atributo `data-reveal-ready` en <html>: si el JS falla o está deshabilitado,
 * el contenido se ve siempre.
 */

const REVEALED_CLASS = 'is-revealed';

// Se marca en la evaluación del módulo (antes de DOMContentLoaded) para que el
// CSS del estado inicial exista antes de que se pinte el contenido.
document.documentElement.setAttribute('data-reveal-ready', '');

const Reveal = {
  init() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sin animación o sin soporte de IntersectionObserver: mostrar de una vez.
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add(REVEALED_CLASS));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(REVEALED_CLASS);
        }
      });
    }, {
      // Recorta la franja por abajo un tercio del viewport: el bloque tiene
      // que estar bien metido en la vista, no apenas asomando por el borde.
      rootMargin: '0px 0px -32% 0px',
      threshold: 0
    });

    const resetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          entry.target.classList.remove(REVEALED_CLASS);
        }
      });
    }, {
      // Viewport real: reinicia sólo cuando el bloque salió por completo.
      threshold: 0
    });

    targets.forEach((el) => {
      revealObserver.observe(el);
      resetObserver.observe(el);
    });
  }
};

export default Reveal;
