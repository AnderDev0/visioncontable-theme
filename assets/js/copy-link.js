/**
 * copy-link.js — Copiar URL del artículo al portapapeles
 * Spec: kb/docs/blog-post.md — sin widgets externos de compartir
 */

const CopyLink = {
  init() {
    const btn = document.getElementById('copy-link-btn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const url = btn.dataset.url || window.location.href;
      const label = btn.querySelector('.post-copy-link__text');

      try {
        await navigator.clipboard.writeText(url);
        if (label) {
          label.textContent = '¡Enlace copiado!';
          setTimeout(() => { label.textContent = 'Copiar enlace'; }, 2500);
        }
        btn.setAttribute('aria-label', 'Enlace copiado al portapapeles');
        setTimeout(() => { btn.setAttribute('aria-label', 'Copiar enlace del artículo'); }, 2500);
      } catch {
        // Fallback para navegadores sin Clipboard API
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (label) {
          label.textContent = '¡Enlace copiado!';
          setTimeout(() => { label.textContent = 'Copiar enlace'; }, 2500);
        }
      }
    });
  }
};

export default CopyLink;
