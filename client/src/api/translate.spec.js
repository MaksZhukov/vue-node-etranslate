import api from './translate';

describe('test api translate', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('method translate return Hi', async () => {
    localStorage.setItem('accessToken', 'qfwqfwqfw2f2.fwqfqfw22f.wfqfwfqwf21f');
    fetch.mockResponseOnce(JSON.stringify('Hi'));
    const response = await api.translate({ text: 'Привет', from: 'ru', to: 'en' });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][1].method).toEqual('POST');
    expect(fetch.mock.calls[0][0]).toEqual('api/translate');
    expect(response).toBe('Hi');
  });
});
