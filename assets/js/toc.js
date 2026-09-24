/**
 * toc.js — Tabla de contenidos dinámica
 * Spec: kb/docs/blog-post.md
 * Condición: visible si >1200 palabras O >4 secciones H2
 * Genera la ToC desde los H2 del contenido del artículo
 */

const TableOfContents = {
  MIN_HEADINGS: 4,

  init() {
    const content = document.querySelector('.gh-content');
    if (!content) return;

    const headings = [...content.querySelectorAll('h2')];
    const wordCount = content.innerText.split(/\s+/).length;

    if (headings.length < this.MIN_HEADINGS && wordCount < 1200) return;

    this._buildToC(headings);
  },

  _buildToC(headings) {
    // Añadir IDs a los H2 si no los tienen
    headings.forEach((h, i) => {
      if (!h.id) {
        h.id = 'section-' + (i + 1);
      }
    });

    const toc = document.createElement('nav');
    toc.className = 'post-toc';
    toc.setAttribute('aria-label', 'Tabla de contenidos');

    const title = document.createElement('p');
    title.className = 'post-toc__title';
    title.textContent = 'En este artículo';
    toc.appendChild(title);

    const ol = document.createElement('ol');
    ol.className = 'post-toc__list';

    headings.forEach(h => {
      const li = document.createElement('li');
      li.className = 'post-toc__item';

      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'post-toc__link';
      a.textContent = h.textContent;
      a.setAttribute('data-gtm', 'blog_toc_click');

      // Scroll suave al hacer clic
      a.addEventListener('click', (e) => {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        h.focus({ preventScroll: true });
        history.pushState(null, '', '#' + h.id);
      });

      li.appendChild(a);
      ol.appendChild(li);
    });

    toc.appendChild(ol);

    // Insertar antes del contenido del artículo
    const postBody = document.querySelector('.post-body');
    if (postBody) {
      postBody.insertBefore(toc, postBody.firstChild);
    }
  }
};

export default TableOfContents;
