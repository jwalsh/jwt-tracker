Object.keys(localStorage)
  .forEach(e => {
    let v = localStorage.getItem(e)
    if (JWT_REGEX.test(v)) {
      console.log(e, v)
    }
  })
