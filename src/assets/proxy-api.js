(() => {
  const BACKEND = 'https://cinephoria-depl.onrender.com'; 
  const FROMS = ['http://localhost:3000', 'https://localhost:3000', 'http://127.0.0.1:3000'];

  const rewrite = (u) => {
    try {
      const s = String(u);
      for (const f of FROMS) if (s.startsWith(f)) return s.replace(f, BACKEND);
      if (s.startsWith('/api') || s.startsWith('/affiches')) return BACKEND + s; // <— RELATIF -> API
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
