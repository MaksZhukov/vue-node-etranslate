const signUp = data => fetch('api/sign-up', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(response => response.json());

const signIn = data => fetch('api/sign-in', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(response => response.json());


const checkToken = () => fetch('api/check-token', {
  method: 'post',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
}).then(response => response.json());

const checkRecoverToken = token => fetch('../api/check-recover-token', {
  method: 'post',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then(response => response.json());

const changePassword = ({ token, password }) => fetch('../api/change-password', {
  method: 'post',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password }),
}).then(response => response.json());

const updateTokens = () => fetch('api/update-tokens', {
  method: 'post',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
  },
}).then(response => response.json());

const sendLinkEmailForRecover = email => fetch('api/email-for-recover', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
}).then(response => response.json());

export default {
  signUp,
  signIn,
  checkToken,
  checkRecoverToken,
  updateTokens,
  sendLinkEmailForRecover,
  changePassword,
};
