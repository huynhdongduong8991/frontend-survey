export const setTokenStorage = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

export const getTokenStorage = () => {
  const tokens = localStorage.getItem("tokens");
  if (tokens) return JSON.parse(tokens);
  return "";
};

export const cleanTokenStorage = () => {
  localStorage.removeItem("tokens");
  localStorage.removeItem("userLogin");
};


export const setUserLoginStorage = (user) => {
  localStorage.setItem("userLogin", JSON.stringify(user));
};

export const getUserLoginStorage = () => {
  return JSON.parse(localStorage.getItem("userLogin")) || {};
};
