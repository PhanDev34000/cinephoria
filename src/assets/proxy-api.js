(() => {
  const FROMS = ['http://localhost:3000', 'https://localhost:3000'];
  const TO = 'https://cinephoria-depl.onrender.com'; 

  const swap = (u) => {
    try {
      let s = String(u);
      for (const f of FROMS) if (s.startsWith(f)) return s.replace(f, TO);
      return s;
    } catch { return u; }
  };

  if (window.fetch) {
    const _fetch = window.fetch.bind(window);
    window.fetch = (input, init) => {
      if (typeof input === 'string') return _fetch(swap(input), init);
      if (window.Request && input instanceof Request) {
        const req = new Request(swap(input.url), input);
        return _fetch(req, init);
      }
      return _fetch(input, init);
    };
  }

  if (window.XMLHttpRequest) {
    const _open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      return _open.call(this, method, swap(url), ...rest);
    };
  }
})();

