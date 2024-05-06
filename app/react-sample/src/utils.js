const TOKEN_NAME = "token";
const USER_INFO = "userInfo";

// 將 token 存到 localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const setUserInfo = (userinfo) => {
  localStorage.setItem(USER_INFO, userinfo);
};

export const getUserInfo = () => {
  return localStorage.getItem(USER_INFO);
};