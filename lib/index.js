'use strict';

(function () {
  var JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

  var parseJwt = function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  Object.keys(localStorage).forEach(function (e) {
    var v = localStorage.getItem(e);
    if (JWT_REGEX.test(v)) {
      var token = v;
      console.log(e, token);
      alert(JSON.stringify(parseJwt(token), null, '  '));
    }
  });
})();