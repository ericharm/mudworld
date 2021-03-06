var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

window.get = function (url) {
  return window.fetch(url, {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
      'X-CSRF-Token': token
    },
    method: 'GET',
    redirect: 'follow',
    referrer: 'no-referrer'
  }).then(function (response) {
    return response.json()
  })
}

window.post = function (url, data) {
  return window.fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
      'X-CSRF-Token': token
    },
    method: 'POST',
    redirect: 'follow',
    referrer: 'no-referrer'
  }).then(function (response) {
    return response.json()
  })
}

window.put = function (url, data) {
  return window.fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
      'X-CSRF-Token': token
    },
    method: 'PUT',
    redirect: 'follow',
    referrer: 'no-referrer'
  }).then(function (response) {
    return response.json()
  })
}
