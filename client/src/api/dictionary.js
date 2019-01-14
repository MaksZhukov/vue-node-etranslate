const getDictionary = query => fetch(`api/get-dictionary?${query}`, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
}).then((response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  } return response.json();
});

export default {
  getDictionary,
};
