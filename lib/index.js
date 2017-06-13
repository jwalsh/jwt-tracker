"use strict";

Object.keys(localStorage).forEach(function (e) {
  var v = localStorage.getItem(e);
  if (JWT_REGEX.test(v)) {
    console.log(e, v);
  }
});