/**
 * legal-toc.js — Índice plegable de las páginas legales (solo móvil)
 * En una columna el índice ocupaba ~500px antes del primer apartado. Aquí se
 * pliega detrás de un botón. El plegado sólo tiene efecto dentro del media
 * query móvil de legal.css, así que en escritorio el índice no cambia.
 * Sin JS el botón queda oculto y el índice se ve completo.
 */

const mobile = window.matchMedia('(max-width: 767px)');

const LegalToc = {
  init() {
    const nav = document.querySelector('.legal-toc');
    const toggle = nav?.querySelector('.legal-toc__toggle');
    const list = nav?.querySelector('.legal-toc__list');
    if (!nav || !toggle || !list) return;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-collapsed', !open);
    };

    nav.classList.add('has-toggle');
    setOpen(false);

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Al elegir un apartado se vuelve a plegar para que el salto no quede
    // tapado por la lista abierta.
    list.addEventListener('click', (event) => {
      if (mobile.matches && event.target.closest('a')) setOpen(false);
    });
  },
};

export default LegalToc;
