import { queryString } from '../helpers';
import api from './dictionary';

describe('test api translate', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('api get translate return [Hi,Hello,Greet]', async () => {
    localStorage.setItem('accessToken', 'qfwqfwqfw2f2.fwqfqfw22f.wfqfwfqwf21f');
    fetch.mockResponseOnce(JSON.stringify(['Hi', 'Hello', 'Greet']));
    const response = await api.getDictionary(queryString({ text: 'Привет', textLang: 'ru', translateLang: 'en' }));
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('api/get-dictionary?text=Привет&textLang=ru&translateLang=en');
    expect(response).toEqual(['Hi', 'Hello', 'Greet']);
  });
});
