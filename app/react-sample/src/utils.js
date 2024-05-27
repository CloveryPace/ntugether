import Cookies from 'universal-cookie';
const TOKEN_NAME = "token";
const USER_INFO = "userInfo";
const cookies = new Cookies();

// 將 token 存到 cookie
export const setAuthToken = (token) => {
  let d = new Date(Date.now());
  let minutes = 60; //60 分鐘後過期
  d.setTime(d.getTime() + (minutes*60*1000));
  cookies.set(TOKEN_NAME, token, { path: '/', expires: d });
};

// 從 cookie 讀取 token
export const getAuthToken = () => {
  return cookies.get(TOKEN_NAME);
};

// 從 cookie 刪除 token
export const removeAuthToken = () => {
  cookies.remove(TOKEN_NAME);
};


export const setUserIdToCookie = (userinfo) => {
  let d = new Date(Date.now());
  let minutes = 60; //60 分鐘後過期
  d.setTime(d.getTime() + (minutes*60*1000));
  cookies.set(USER_INFO, userinfo, { path: '/', expires: d });
};

export const getUserId = () => {
  return cookies.get(USER_INFO);
};

export const removeUserId = () => {
  cookies.remove(USER_INFO);
};
