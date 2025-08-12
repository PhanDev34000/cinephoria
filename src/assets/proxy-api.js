(() => {
  const BACKEND = 'https://cinephoria-se44.onrender.com'; 
  const FROMS = ['http://localhost:3000', 'https://localhost:3000', 'http://127.0.0.1:3000'];
  const API_ROOTS = ['films','avis','seances','reservations','utilisateurs','salles','stats','incidents','login','register'];

  const rewrite = (u) => {
    try {
      let s = String(u).trim();
      if (!s) return s;

      // Remplacement localhost absolu
      for (const f of FROMS) if (s.startsWith(f)) return s.replace(f, BACKEND);

      // Normaliser les relatives sans slash -> "/..."
      if (!s.startsWith('http') && !s.startsWith('/')) s = '/' + s;

      // /api... ou /affiches... -> vers BACKEND
      if (s.startsWith('/api') || s.startsWith('/affiches')) return BACKEND + s;

      // Si on appelle directement /films, /seances, etc. -> préfixer /api
      const first = s.split(/[/?#]/)[1] || '';
      if (API_ROOTS.includes(first)) return BACKEND + '/api' + s;

      return s;
    } catch { return u; }
  };

  // fetch
  if (window.fetch) {
    const _fetch = window.fetch.bind(window);
    window.fetch = (input, init) => {
      if (typeof input === 'string') return _fetch(rewrite(input), init);
      if (input && input.url) {
        const req = new Request(rewrite(input.url), input);
        return _fetch(req, init);
      }
      return _fetch(input, init);
    };
  }

  // XHR (Angular HttpClient)
  if (window.XMLHttpRequest) {
    const _open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      return _open.call(this, method, rewrite(url), ...rest);
    };
  }
})();
