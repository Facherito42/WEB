/* =========================================================
   Menú hamburguesa para móviles — Instituto Geográfico Militar
   No requiere tocar el HTML de cada página: detecta el header
   existente (.top-bar + nav.main-nav) y arma el panel solo.
   ========================================================= */
(function () {
  var BREAKPOINT = 900;

  document.addEventListener('DOMContentLoaded', function () {
    var topBar = document.querySelector('.top-bar');
    var nav = document.querySelector('header .main-nav');
    if (!topBar || !nav) return;

    /* ---------- Botón hamburguesa ---------- */
    var burger = document.createElement('button');
    burger.className = 'igm-burger';
    burger.setAttribute('aria-label', 'Abrir menú');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    topBar.appendChild(burger);

    /* ---------- Overlay ---------- */
    var overlay = document.createElement('div');
    overlay.className = 'igm-overlay';
    document.body.appendChild(overlay);

    /* ---------- Cabecera del panel (título + cerrar) ---------- */
    var panelHeader = document.createElement('div');
    panelHeader.className = 'igm-panel-header';
    panelHeader.innerHTML = '<span>MENÚ</span><button class="igm-close" aria-label="Cerrar menú">&times;</button>';
    nav.insertBefore(panelHeader, nav.firstChild);
    var closeBtn = panelHeader.querySelector('.igm-close');

    /* ---------- Acordeón para los items con submenú (.dropdown) ---------- */
    var topUl = nav.querySelector('ul');
    if (!topUl) return;
    var topLevelItems = Array.prototype.slice.call(topUl.children);
    topLevelItems.forEach(function (li) {
      var dropdown = li.querySelector('.dropdown');
      var link = li.querySelector('a');
      if (!link) return;

      if (dropdown) {
        li.classList.add('has-dropdown');
        link.setAttribute('aria-expanded', 'false');
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= BREAKPOINT) {
            e.preventDefault();
            var isOpen = li.classList.toggle('igm-open');
            link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          }
        });
      } else {
        // Item sin submenú: navega normalmente y cierra el panel
        link.addEventListener('click', function () {
          if (window.innerWidth <= BREAKPOINT) closeMenu();
        });
      }
    });

    // Los links dentro de los submenús también cierran el panel al navegar
    nav.querySelectorAll('.dropdown a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= BREAKPOINT) closeMenu();
      });
    });

    /* ---------- Abrir / cerrar ---------- */
    function openMenu() {
      nav.classList.add('igm-open-nav');
      overlay.classList.add('igm-show');
      burger.classList.add('igm-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('igm-menu-locked');
    }
    function closeMenu() {
      nav.classList.remove('igm-open-nav');
      overlay.classList.remove('igm-show');
      burger.classList.remove('igm-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('igm-menu-locked');
    }

    burger.addEventListener('click', function () {
      nav.classList.contains('igm-open-nav') ? closeMenu() : openMenu();
    });
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > BREAKPOINT) closeMenu();
    });
  });
})();
