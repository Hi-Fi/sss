export function fetcher(url, options) {
  const update = { ...options };
  if (localStorage.getItem('AUTHORIZATION')) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem('AUTHORIZATION')}`,
    };
  }

  return fetch(url, update);
}

export function setToken(token) {
  localStorage.setItem('AUTHORIZATION', token)
}

export function removeToken() {
  localStorage.removeItem('AUTHORIZATION');
}
