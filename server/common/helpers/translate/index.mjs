import translate from 'translate';
import config from 'config';

const { server: { translate: configTranslate } } = config;

translate.engine = configTranslate.engine;
translate.key = configTranslate.key;


export default translate;
