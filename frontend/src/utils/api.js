import axios from 'axios';

export function setToken(token) {
  axios.defaults.headers.common['Authorization'] =
      `Bearer ${token}`;
}

export function removeToken() {
  console.log("Removing token")
  delete axios.defaults.headers.common['Authorization'];
}
