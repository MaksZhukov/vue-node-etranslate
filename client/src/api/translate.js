const translate = data => fetch('api/translate', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify(data),
}).then(response => response.json());

export default {
  translate,
};
