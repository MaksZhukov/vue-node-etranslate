const addToUserDictionary = data => fetch('api/add-to-user-dictionary', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify(data),
}).then(response => response.json());

const removeFromUserDictionary = ids => fetch('api/remove-from-user-dictionary', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify({ ids }),
}).then(response => response.json());

const getUserDictionary = userId => fetch('api/get-user-dictionary', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify({ userId }),
}).then(response => response.json());

export default {
  addToUserDictionary,
  getUserDictionary,
  removeFromUserDictionary,

};
