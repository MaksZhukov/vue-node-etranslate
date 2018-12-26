import api from './user';

describe('test api user', () => {
  const email = 'email@mail.ru';
  const password = '1111';
  localStorage.setItem('accessToken', '21421214.214421214214.dqfw12');
  localStorage.setItem('refreshToken', 'fqfwfqwfqw.21442fwqqfwqfw1214214.dqfwfq212');
  const recoverToken = 'fqwfqwfqwfq.fwqfqwf12f2f.ff212f1f2';
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('signup return status warning and message confirm your email', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'warning', message: 'confirm your email' }));
    const response = await api.signUp({ email, password });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][1].method).toEqual('POST');
    expect(fetch.mock.calls[0][0]).toEqual('api/sign-up');
    expect(response.status).toBe('warning');
    expect(response.message).toBe('confirm your email');
  });
  it('signin return status error and message Problem with database', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'error', message: 'problem with database' }));
    const response = await api.signIn({ email, password });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ email, password }));
    expect(response.status).toBe('error');
    expect(response.message).toBe('problem with database');
  });
  it('checktoken return access false', async () => {
    fetch.mockResponseOnce(JSON.stringify({ access: false }));
    const response = await api.checkToken();
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('api/check-token');
    expect(response.access).toBe(false);
  });
  it('checktoken return access false', async () => {
    fetch.mockResponseOnce(JSON.stringify({ access: false }));
    const response = await api.checkToken();
    expect(fetch.mock.calls[0][1].headers.Authorization).toEqual(`Bearer ${localStorage.getItem('accessToken')}`);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('api/check-token');
    expect(response.access).toBe(false);
  });
  it('checkRecoverToken return access true', async () => {
    fetch.mockResponseOnce(JSON.stringify({ access: true }));
    const response = await api.checkRecoverToken(recoverToken);
    expect(fetch.mock.calls[0][1].headers.Authorization).toEqual(`Bearer ${recoverToken}`);
    expect(fetch.mock.calls[0][0]).toEqual('../api/check-recover-token');
    expect(response.access).toBe(true);
  });
  it('changePassword return status success and message password has been changed', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success', message: 'password has been updated' }));
    const response = await api.changePassword({ token: recoverToken, password });
    expect(fetch.mock.calls[0][1].headers.Authorization).toEqual(`Bearer ${recoverToken}`);
    expect(response.status).toBe('success');
    expect(response.message).toBe('password has been updated');
  });
  it('updateTokens return new refresh, update tokens and expiresIn', async () => {
    const newRefreshToken = 'wfqqfwqfw.fwqfqwqfwcqwqw.141214241';
    const newAccessToken = 'fqwqwfqfw.fqw.gwqgqwgwgqw';
    const newExpiresIn = 212521215152;
    fetch.mockResponseOnce(JSON.stringify({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: newExpiresIn,
    }));
    const response = await api.updateTokens();
    expect(fetch.mock.calls[0][1].headers.Authorization).toEqual(`Bearer ${localStorage.getItem('refreshToken')}`);
    expect(response.accessToken).toBe(newAccessToken);
    expect(response.refreshToken).toBe(newRefreshToken);
    expect(response.expiresIn).toBe(newExpiresIn);
  });
  it('sendLinkEmailForRecover return status success and message check your email', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success', message: 'check your email' }));
    const response = await api.sendLinkEmailForRecover(email);
    expect(fetch.mock.calls[0][0]).toEqual('api/email-for-recover');
    expect(response.status).toEqual('success');
    expect(response.message).toEqual('check your email');
  });
});
