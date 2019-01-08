const addToDictionary = data => fetch('api/add-to-dictionary', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify(data),
}).then(response => response.json());

const removeFromDictionary = id => fetch('api/remove-from-dictionary', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify({ id }),
}).then(response => response.json());

const getDictionary = userId => fetch('api/get-dictionary', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify({ userId }),
}).then(response => response.json());

export default {
  addToDictionary,
  getDictionary,
  removeFromDictionary,
};
