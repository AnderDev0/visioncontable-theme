/**
 * main.js — Entry point del tema visioncontable
 * Inicializa módulos según el contexto de la página.
 * Todos los scripts se cargan con defer desde default.hbs.
 */

import MobileMenu from './mobile-menu.js';
import FaqAccordion from './faq-accordion.js';
import HeaderTheme from './header-theme.js';
import Reveal from './reveal.js';
import Analytics from './analytics.js';
import NavDropdown from './nav-dropdown.js';

document.addEventListener('DOMContentLoaded', () => {
  // Módulos presentes en todas las páginas
  Analytics.init();
  NavDropdown.init();
  MobileMenu.init();
  HeaderTheme.init();
  Reveal.init();

  // Acordeón FAQ (Home, Landings, About)
  if (document.querySelector('.faq-accordion')) {
    FaqAccordion.init();
  }

  // Páginas legales: índice plegable en móvil (carga bajo demanda)
  if (document.querySelector('.legal-toc')) {
    import('./legal-toc.js').then(({default: LegalToc}) => LegalToc.init());
  }

  // Blog post: copiar enlace + tabla de contenidos.
  // Importados bajo demanda: como imports estáticos, el navegador los descargaba
  // en TODAS las páginas aunque solo sirvan en el artículo.
  if (document.body.classList.contains('post-template')) {
    Promise.all([import('./copy-link.js'), import('./toc.js')])
      .then(([{default: CopyLink}, {default: TableOfContents}]) => {
        CopyLink.init();
        TableOfContents.init();
      });
  }
});
