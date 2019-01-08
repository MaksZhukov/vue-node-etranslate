import Dictionary from 'yandex-dictionary';
import config from 'config';

const { server: { dictionary: configDictionary } } = config;


const dictionary = new Dictionary(configDictionary.key);

export default dictionary;
