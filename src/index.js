(() => {
  const JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

  const parseJwt = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  Object.keys(localStorage)
    .forEach(e => {
      const v = localStorage.getItem(e);
      if (JWT_REGEX.test(v)) {
        const token = v;
        console.log(e, token);
        alert(JSON.stringify(parseJwt(token), null, '  '));
      }
    });
})();
