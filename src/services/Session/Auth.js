import Axios from "axios";

const tokenKey = 'token';

export function setToken(token){
    sessionStorage.setItem(tokenKey,token)
}

export function getToken(){
    return sessionStorage.getItem(tokenKey)
}

export function deleteToken(){
    sessionStorage.removeItem(tokenKey)
}

export function initInterceptor (){
    Axios.interceptors.request.use(
        (config) => {
          const apiToken = getToken();
          if (apiToken) {
            config.headers = { 'Authorization': `Bearer ${apiToken}`
                          };
          }
      
          console.log("Request was sent");
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
}
