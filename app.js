/**
 * ITSUKI DEVDOCS - CLIENT ENGINE (app.js)
 * High-performance search, keyboard navigation and reactive rendering
 */

(function () {
  'use strict';

  // Referencias DOM
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const sidebarTree = document.getElementById('sidebar-tree');
  const contentPanel = document.getElementById('content-panel');
  const contentInner = document.getElementById('content-inner');
  const filterTabs = document.querySelectorAll('.filter-pill');
  const searchStats = document.getElementById('search-stats');
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const shortcutsBtn = document.getElementById('shortcuts-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebarPanel = document.getElementById('sidebar-panel');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  // Estado
  let currentDocId = "intro";
  let activeFilter = "all";
  let flatItemsList = [];
  let currentHighlightedIndex = -1;

  // Flatten de todos los documentos para búsqueda y navegación
  function initializeDocsIndex() {
    flatItemsList = [];
    ITSUKI_DOCS.categories.forEach(category => {
      category.items.forEach(item => {
        flatItemsList.push({
          ...item,
          categoryName: category.name,
          categoryIcon: category.icon
        });
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Resaltador de Sintaxis Básico para Itsuki (Tokenizador de paso único)
  function highlightItsukiCode(code) {
    if (!code) return "";

    const keywords = new Set([
      "fn", "var", "const", "return", "if", "else", "while", "for",
      "struct", "class", "union", "typedef", "enum", "using", "namespace",
      "extern", "inline", "static", "public", "private", "this", "sizeof",
      "break", "continue", "switch", "case", "default", "__asm__", "true", "false", "null"
    ]);

    const types = new Set([
      "int", "int8", "int16", "int32", "int64", "uint8", "uint16", "uint32", "uint64",
      "float", "double", "char", "bool", "void", "string", "Vector", "Result", "DateTime",
      "Benchmark", "size_t"
    ]);

    const tokenRegex = /(\/\/[^\n]*)|(#[a-zA-Z_]\w*)|(f?"(?:\\.|[^"\\])*"|'[^']*')|(0x[0-9a-fA-F]+|\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*\b)|([<>&])/g;

    return code.replace(tokenRegex, (match, comment, prep, str, num, ident, specialChar, offset) => {
      if (comment) return `<span class="token-comment">${escapeHtml(comment)}</span>`;
      if (prep) return `<span class="token-kw">${escapeHtml(prep)}</span>`;
      if (str) return `<span class="token-str">${escapeHtml(str)}</span>`;
      if (num) return `<span class="token-num">${escapeHtml(num)}</span>`;
      if (ident) {
        if (keywords.has(ident)) return `<span class="token-kw">${escapeHtml(ident)}</span>`;
        if (types.has(ident)) return `<span class="token-type">${escapeHtml(ident)}</span>`;
        const rest = code.slice(offset + ident.length);
        if (/^\s*\(/.test(rest)) {
          return `<span class="token-fn">${escapeHtml(ident)}</span>`;
        }
        return escapeHtml(ident);
      }
      if (specialChar) {
        if (specialChar === '<') return '&lt;';
        if (specialChar === '>') return '&gt;';
        if (specialChar === '&') return '&amp;';
      }
      return match;
    });
  }

  // Notificación Toast
  function showToast(message) {
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2400);
  }

  // Copiar al portapapeles
  window.copyToClipboard = function (text, successMsg) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || "¡Copiado al portapapeles!");
      }).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(successMsg || "¡Copiado al portapapeles!");
  }

  // Copiar código de ejemplo por índice seguro sin escapar cadenas en HTML
  window.copyExampleCode = function (docId, exIndex) {
    const doc = flatItemsList.find(d => d.id === docId);
    if (doc && doc.examples && doc.examples[exIndex]) {
      window.copyToClipboard(doc.examples[exIndex].code, "¡Código de ejemplo copiado!");
    }
  };

  // Renderizar la barra lateral (Sidebar)
  function renderSidebar(query = "") {
    const q = query.trim().toLowerCase();
    sidebarTree.innerHTML = "";
    let visibleCount = 0;
    const currentFlatVisible = [];

    ITSUKI_DOCS.categories.forEach(category => {
      // Filtrar por categoría seleccionada
      if (activeFilter !== "all") {
        if (activeFilter === "guide" && category.id !== "guide") return;
        if (activeFilter === "syntax" && category.id !== "syntax") return;
        if (activeFilter === "stdlib" && !["fundamental", "string-lib", "math-lib", "time-lib", "ctypes-lib"].includes(category.id)) return;
        if (activeFilter === "result" && category.id !== "result") return;
        if (activeFilter === "system" && !["interop", "setjmp-lib", "c-lib"].includes(category.id)) return;
      }

      // Filtrar ítems por búsqueda
      const matchingItems = category.items.filter(item => {
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          (item.signature && item.signature.toLowerCase().includes(q)) ||
          category.name.toLowerCase().includes(q)
        );
      });

      if (matchingItems.length === 0) return;

      visibleCount += matchingItems.length;

      const catBlock = document.createElement('div');
      catBlock.className = 'sidebar-category-block';

      const catHeader = document.createElement('div');
      catHeader.className = 'category-header';
      catHeader.innerHTML = `
        <span>${category.name}</span>
        <span class="category-badge-pill">${matchingItems.length}</span>
      `;

      const itemsList = document.createElement('ul');
      itemsList.className = 'category-items-list';

      matchingItems.forEach(item => {
        currentFlatVisible.push(item);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = `doc-nav-item ${item.id === currentDocId ? 'active' : ''}`;
        a.href = `#${item.id}`;
        a.dataset.id = item.id;
        a.innerHTML = `
          <span class="nav-item-title">
            <span class="type-badge type-${item.type}">${item.type}</span>
            <span>${item.title}</span>
          </span>
        `;

        a.addEventListener('click', (e) => {
          e.preventDefault();
          navigateToDoc(item.id);
          if (window.innerWidth <= 900) {
            sidebarPanel.classList.remove('open');
          }
        });

        li.appendChild(a);
        itemsList.appendChild(li);
      });

      catBlock.appendChild(catHeader);
      catBlock.appendChild(itemsList);
      sidebarTree.appendChild(catBlock);
    });

    if (visibleCount === 0) {
      sidebarTree.innerHTML = `
        <div class="empty-search-state">
          <img src="img/itsuki_logo.png" alt="Itsuki Logo" class="empty-search-logo" />
          <p>No se encontraron resultados para "<strong>${escapeHtml(q)}</strong>"</p>
          <span class="empty-search-hint">Presiona Esc para limpiar la búsqueda</span>
        </div>
      `;
    }

    searchStats.textContent = `${visibleCount} temas disponibles`;
    searchClearBtn.style.display = q ? 'block' : 'none';

    // Ajustar resaltado para teclado
    updateKeyboardHighlight();
  }

  // Navegación hacia un documento
  function navigateToDoc(id) {
    const doc = flatItemsList.find(d => d.id === id);
    if (!doc) return;

    currentDocId = doc.id;
    window.location.hash = doc.id;
    document.title = `${doc.title} — Itsuki DevDocs`;

    // Actualizar clase activa en sidebar
    document.querySelectorAll('.doc-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === doc.id);
    });

    renderDocContent(doc);
    contentPanel.scrollTop = 0;
  }

  // Renderizar contenido del artículo
  function renderDocContent(doc) {
    // Buscar anterior y siguiente
    const currentIndex = flatItemsList.findIndex(d => d.id === doc.id);
    const prevDoc = currentIndex > 0 ? flatItemsList[currentIndex - 1] : null;
    const nextDoc = currentIndex < flatItemsList.length - 1 ? flatItemsList[currentIndex + 1] : null;

    let html = `
      <div class="doc-header-meta">
        <div class="breadcrumbs-trail">
          <a href="#intro" class="breadcrumb-crumb">Itsuki v5.5</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-crumb">${doc.categoryName}</span>
          <span class="breadcrumb-separator">/</span>
          <span>${doc.title}</span>
        </div>
        <div class="doc-actions-bar">
          <button class="action-icon-btn" onclick="copyToClipboard(window.location.href, '¡Enlace directo copiado!')" title="Copiar enlace directo">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            <span>Copiar Enlace</span>
          </button>
        </div>
      </div>

      <div class="doc-title-row">
        <h1 class="doc-main-heading">${doc.title}</h1>
        <span class="type-badge type-${doc.type}">${doc.type}</span>
      </div>
    `;

    if (doc.id === 'intro') {
      html += `
        <div class="intro-hero-banner">
          <img src="img/itsuki_logo.png" alt="Itsuki Official Logo" class="intro-hero-logo" />
          <div class="intro-hero-text">
            <h3>Lenguaje de Programación Itsuki v5.5</h3>
            <p>Compilador nativo dual x86_64 / x86_32 de alto rendimiento. Diseñado para control total de memoria, velocidad nativa en ensamblador GAS y cero sobrecosto de ejecución.</p>
            <div class="intro-hero-actions">
              <a href="https://discord.gg/K6SEpB7Pf5" target="_blank" rel="noopener noreferrer" class="hero-action-btn hero-action-discord">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Servidor de Discord</span>
              </a>
              <a href="https://github.com/Apolo1061/itsuki-lang" target="_blank" rel="noopener noreferrer" class="hero-action-btn hero-action-github">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    html += `
      <p class="doc-summary-lead">${doc.summary}</p>
    `;

    // Firma (Signature)
    if (doc.signature) {
      html += `
        <div class="signature-card">
          <div class="signature-label">Firma & Definición</div>
          <div class="signature-code">${highlightItsukiCode(doc.signature)}</div>
        </div>
      `;
    }

    // "¿Qué hace?"
    if (doc.what) {
      html += `
        <div class="doc-section-card">
          <h2 class="section-card-title">
            <span class="section-icon-badge">💡</span>
            <span>¿Qué hace?</span>
          </h2>
          <div class="section-prose">${doc.what}</div>
        </div>
      `;
    }

    // "¿Cómo lo hace tras bambalinas?" (Explicación técnica para aprender)
    if (doc.how) {
      html += `
        <div class="doc-section-card">
          <h2 class="section-card-title">
            <span class="section-icon-badge">⚙️</span>
            <span>¿Cómo lo hace? (Bajo el capó)</span>
          </h2>
          <div class="section-prose">${doc.how}</div>
        </div>
      `;
    }

    // Tabla de parámetros
    if (doc.params && doc.params.length > 0) {
      html += `
        <div class="doc-section-card">
          <h2 class="section-card-title">
            <span class="section-icon-badge">📋</span>
            <span>Parámetros & Argumentos</span>
          </h2>
          <div class="params-table-wrapper">
            <table class="doc-params-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
      `;
      doc.params.forEach(p => {
        html += `
          <tr>
            <td class="param-name-cell">${p.name}</td>
            <td class="param-type-cell">${p.type}</td>
            <td>${p.desc}</td>
          </tr>
        `;
      });
      html += `
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Retorno
    if (doc.returns) {
      html += `
        <div class="doc-section-card">
          <h2 class="section-card-title">
            <span class="section-icon-badge">↩️</span>
            <span>Valor de Retorno</span>
          </h2>
          <div class="section-prose">
            <code>${doc.returns}</code>
          </div>
        </div>
      `;
    }

    // Ejemplos Prácticos
    if (doc.examples && doc.examples.length > 0) {
      html += `
        <div class="doc-section-card">
          <h2 class="section-card-title">
            <span class="section-icon-badge">💻</span>
            <span>Ejemplos de Código Práctico</span>
          </h2>
      `;
      doc.examples.forEach((ex, exIndex) => {
        html += `
          <div class="code-example-card">
            <div class="code-header-bar">
              <span class="example-file-title">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                ${ex.title || "ejemplo.suki"}
              </span>
              <button class="copy-code-btn" onclick="copyExampleCode('${doc.id}', ${exIndex})">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copiar</span>
              </button>
            </div>
            <pre class="code-display-block"><code>${highlightItsukiCode(ex.code)}</code></pre>
          </div>
        `;
      });
      html += `</div>`;
    }

    // Pie de página Anterior / Siguiente
    html += `
      <div class="article-nav-footer">
        ${prevDoc ? `
          <a class="article-nav-btn" href="#${prevDoc.id}" onclick="event.preventDefault(); window.navigateToDoc('${prevDoc.id}');">
            <span class="nav-direction-label">← Anterior</span>
            <span class="nav-target-title">${prevDoc.title}</span>
          </a>
        ` : `<div></div>`}

        ${nextDoc ? `
          <a class="article-nav-btn" style="text-align: right;" href="#${nextDoc.id}" onclick="event.preventDefault(); window.navigateToDoc('${nextDoc.id}');">
            <span class="nav-direction-label">Siguiente →</span>
            <span class="nav-target-title">${nextDoc.title}</span>
          </a>
        ` : `<div></div>`}
      </div>
    `;

    contentInner.innerHTML = html;
  }

  // Atajos de teclado estilo DevDocs
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ignorar si el usuario está escribiendo en el buscador
      const isSearchFocused = document.activeElement === searchInput;

      // '/' para enfocar buscador
      if (e.key === '/' && !isSearchFocused) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
        return;
      }

      // 'Escape' para limpiar búsqueda o cerrar modal
      if (e.key === 'Escape') {
        if (shortcutsModal.classList.contains('active')) {
          shortcutsModal.classList.remove('active');
          return;
        }
        if (searchInput.value) {
          searchInput.value = '';
          renderSidebar('');
          searchInput.blur();
        } else if (isSearchFocused) {
          searchInput.blur();
        }
        return;
      }

      // '?' para abrir modal de atajos
      if (e.key === '?' && !isSearchFocused) {
        e.preventDefault();
        shortcutsModal.classList.toggle('active');
        return;
      }

      // Navegación con flechas arriba/abajo en la lista visible
      const visibleNavItems = Array.from(document.querySelectorAll('.doc-nav-item'));
      if (visibleNavItems.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentHighlightedIndex = (currentHighlightedIndex + 1) % visibleNavItems.length;
        highlightNavItem(visibleNavItems[currentHighlightedIndex]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentHighlightedIndex = (currentHighlightedIndex - 1 + visibleNavItems.length) % visibleNavItems.length;
        highlightNavItem(visibleNavItems[currentHighlightedIndex]);
      } else if (e.key === 'Enter' && currentHighlightedIndex >= 0 && currentHighlightedIndex < visibleNavItems.length) {
        e.preventDefault();
        const targetId = visibleNavItems[currentHighlightedIndex].dataset.id;
        navigateToDoc(targetId);
        searchInput.blur();
      }

      // Atajo '[' para anterior y ']' para siguiente
      if (!isSearchFocused) {
        if (e.key === '[') {
          const currentIndex = flatItemsList.findIndex(d => d.id === currentDocId);
          if (currentIndex > 0) navigateToDoc(flatItemsList[currentIndex - 1].id);
        } else if (e.key === ']') {
          const currentIndex = flatItemsList.findIndex(d => d.id === currentDocId);
          if (currentIndex < flatItemsList.length - 1) navigateToDoc(flatItemsList[currentIndex + 1].id);
        }
      }
    });
  }

  function highlightNavItem(itemEl) {
    document.querySelectorAll('.doc-nav-item').forEach(el => el.classList.remove('kb-focus'));
    if (itemEl) {
      itemEl.classList.add('kb-focus');
      itemEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function updateKeyboardHighlight() {
    currentHighlightedIndex = -1;
    const visibleNavItems = Array.from(document.querySelectorAll('.doc-nav-item'));
    const activeItemIdx = visibleNavItems.findIndex(el => el.dataset.id === currentDocId);
    if (activeItemIdx >= 0) {
      currentHighlightedIndex = activeItemIdx;
    }
  }

  // Inicialización de Eventos y UI
  function init() {
    initializeDocsIndex();

    // Eventos del buscador
    searchInput.addEventListener('input', (e) => {
      renderSidebar(e.target.value);
    });

    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      renderSidebar('');
      searchInput.focus();
    });

    // Filtros de categoría
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeFilter = tab.dataset.filter;
        renderSidebar(searchInput.value);
      });
    });

    // Menú móvil drawer
    mobileMenuBtn.addEventListener('click', () => {
      sidebarPanel.classList.toggle('open');
    });

    // Modal de atajos
    shortcutsBtn.addEventListener('click', () => shortcutsModal.classList.add('active'));
    modalCloseBtn.addEventListener('click', () => shortcutsModal.classList.remove('active'));
    shortcutsModal.addEventListener('click', (e) => {
      if (e.target === shortcutsModal) shortcutsModal.classList.remove('active');
    });

    // Hash routing inicial
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && flatItemsList.some(d => d.id === initialHash)) {
      currentDocId = initialHash;
    }

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== currentDocId && flatItemsList.some(d => d.id === hash)) {
        navigateToDoc(hash);
      }
    });

    // Exponer función de navegación globalmente
    window.navigateToDoc = navigateToDoc;

    // Render inicial
    renderSidebar();
    navigateToDoc(currentDocId);
    setupKeyboardShortcuts();
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
