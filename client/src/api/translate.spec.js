import { queryString } from '../helpers';
import api from './translate';

describe('test api translate', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('api translate return Hi', async () => {
    localStorage.setItem('accessToken', 'qfwqfwqfw2f2.fwqfqfw22f.wfqfwfqwf21f');
    fetch.mockResponseOnce(JSON.stringify('Hi'));
    const response = await api.translate(queryString({ text: 'Привет', textLang: 'ru', translateLang: 'en' }));
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('api/translate?text=Привет&textLang=ru&translateLang=en');
    expect(response).toBe('Hi');
  });
});
