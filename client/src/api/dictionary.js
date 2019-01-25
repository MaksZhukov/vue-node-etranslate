const getDictionary = query => fetch(`api/get-dictionary?${query}`, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
}).then(response => response.json());

export default {
  getDictionary,
};
