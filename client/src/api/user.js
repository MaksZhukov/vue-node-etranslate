const signUp = data => fetch('api/sign-up', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(response => response.json()).then(resData => resData);

const signIn = data => fetch('api/sign-in', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(response => response.json()).then(resData => resData);

export default {
  signUp,
  signIn,
};
