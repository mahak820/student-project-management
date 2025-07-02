// utils/auth.js
export const isAuthenticated = () => {
  return !!localStorage.getItem('user'); // Or use a cookie, context, etc.
};
