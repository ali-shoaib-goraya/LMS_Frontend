
export const saveToCookies = (key, value, options = {}) => {
    const expires = options.expires
      ? `;expires=${new Date(options.expires).toUTCString()}`
      : '';
    document.cookie = `${key}=${value};path=/;${expires}`;
  };
  
  export const getFromCookies = (key) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(key));
    return cookie ? cookie.split('=')[1] : null;
  };
  
  export const deleteFromCookies = (key) => {
    document.cookie = `${key}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  };
  