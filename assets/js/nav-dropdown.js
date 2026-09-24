/**
 * nav-dropdown.js — Dropdown "Servicios" del header (escritorio)
 * Spec: kb/docs/header-specifications.md §5 (WCAG 2.2 AA)
 *
 * Sin JS el menú se abre por CSS con :hover / :focus-within. Con JS se añade
 * .has-js al <li> y el estado visible pasa a depender SOLO de aria-expanded,
 * para que lo que anuncia el lector de pantalla coincida con lo que se ve
 * (antes aria-expanded se quedaba en "false" con el menú abierto).
 *
 * Abre/cierra con clic o Enter/Espacio, cierra con Escape (devuelve el foco
 * al botón), al sacar el foco del menú y al hacer clic fuera. El hover sigue
 * abriendo con un pequeño retardo al salir, para poder cruzar el hueco entre
 * el botón y el panel sin que se cierre.
 */

const CLOSE_DELAY = 150;

const NavDropdown = {
  init() {
    document.querySelectorAll('.site-nav__item--dropdown').forEach((item) => {
      const trigger = item.querySelector('.site-nav__dropdown-trigger');
      if (!trigger) return;

      item.classList.add('has-js');
      let closeTimer = null;

      const setOpen = (open) => {
        clearTimeout(closeTimer);
        trigger.setAttribute('aria-expanded', String(open));
      };
      const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';

      trigger.addEventListener('click', () => setOpen(!isOpen()));

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) {
          setOpen(false);
          trigger.focus();
        }
      });

      item.addEventListener('focusout', (e) => {
        if (!item.contains(e.relatedTarget)) setOpen(false);
      });

      document.addEventListener('click', (e) => {
        if (isOpen() && !item.contains(e.target)) setOpen(false);
      });

      // Solo con puntero real: en táctil mouseenter llega junto al clic y
      // lo abriría y cerraría en el mismo toque.
      const hover = window.matchMedia('(hover: hover)');
      item.addEventListener('mouseenter', () => { if (hover.matches) setOpen(true); });
      item.addEventListener('mouseleave', () => {
        if (!hover.matches) return;
        closeTimer = setTimeout(() => trigger.setAttribute('aria-expanded', 'false'), CLOSE_DELAY);
      });
    });
  }
};

export default NavDropdown;
