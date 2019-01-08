const getDictionary = data => fetch('api/get-dictionary', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify(data),
}).then((response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  } return response.json();
});

export default {
  getDictionary,
};
