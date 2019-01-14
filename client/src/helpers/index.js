import JsCache from 'js-cache';

const cacheDictionary = new JsCache();
const cacheTranslate = new JsCache();


const queryString = params => Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

const setItemsToLocalStorage = (data) => {
  Object.keys(data).forEach((name) => {
    localStorage.setItem(name, data[name]);
  });
};
const checkItemsInLocalStorage = (arrItems) => {
  let response = true;
  arrItems.forEach((name) => {
    if (!localStorage.getItem(name)) {
      response = false;
    }
  });
  return response;
};

export {
  setItemsToLocalStorage,
  checkItemsInLocalStorage,
  cacheDictionary,
  cacheTranslate,
  queryString,
};
