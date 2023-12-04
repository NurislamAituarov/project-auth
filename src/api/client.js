import { httpClient } from './httpClient';

export async function createUser(body) {
  return httpClient.post(`${process.env.REACT_APP_API_BASE_URL}/auth/registration`, { ...body });
}
export async function logInUser(body) {
  return httpClient.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { ...body });
}
export async function getUsers() {
  return httpClient.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users`);
}
