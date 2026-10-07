import adminCredentials from '../mock/adminCredentials';

const ADMIN_SESSION_KEY = 'portfolio-admin-authenticated';

// This adapter keeps UI code independent from the current mock authentication.
// Replace its internals with an API client when Spring Security is connected.
export function signInAdmin(id, password) {
  const isValid = id === adminCredentials.id && password === adminCredentials.password;

  if (isValid) {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
  }

  return isValid;
}

export function signOutAdmin() {
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAdminAuthenticated() {
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}
