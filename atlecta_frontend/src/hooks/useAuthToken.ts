const TOKEN_KEY = "access_token";

export const useAuthToken = () => {
  const getToken = () => localStorage.getItem(TOKEN_KEY);

  const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  return {
    getToken,
    setToken,
    removeToken,
  };
};
