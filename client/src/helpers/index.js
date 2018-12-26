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
const delay = m => new Promise(r => setTimeout(r, m));

export {
  setItemsToLocalStorage,
  checkItemsInLocalStorage,
  delay,
};
