import apiTranslate from '../../api/translate';
import { cacheTranslate, queryString } from '../../helpers';

const defaultState = () => ({
    inputText: '',
    outputText: '',
    textLang: { name: 'English', abbr: 'en' },
    translateLang: { name: 'Русский', abbr: 'ru' },
    translateResponse: {},
    translateByImageResponse: {},
});

export default {
    namespaced: true,
    state: defaultState(),
    mutations: {
        translatePending(state, payload) {
            state.translateResponse = payload;
        },
        translateError(state, payload) {
            state.translateResponse = payload;
        },
        translateSuccess(state, payload) {
            state.translateResponse = payload;
            if (!state.inputText) {
                state.outputText = '';
                state.describeTranslate = { tr: [] };
            } else {
                state.outputText = payload;
            }
        },
        translateByImagePending(state, payload) {
            state.translateByImageResponse = payload;
        },
        translateByImageError(state, payload) {
            state.translateByImageResponse = payload;
        },
        translateByImageSuccess(state, payload) {
            state.translateByImageResponse = payload;
            state.inputText = payload.text;
            state.outputText = payload.translation;
        },
        switchChosenLanguages(state) {
            [state.inputText, state.outputText] = [state.outputText, state.inputText];
            [state.textLang, state.translateLang] = [state.translateLang, state.textLang];
        },
        updateInputText(state, text) {
            state.inputText = text;
        },
        updateOutputText(state, text) {
            state.outputText = text;
        },
        updateTextLang(state, lang) {
            state.textLang = lang;
        },
        updateTranslateLang(state, lang) {
            state.translateLang = lang;
        },
        clearOutputText(state) {
            state.outputText = '';
            state.describeTranslate = { tr: [] };
        },
    },
    actions: {
        async translate({ commit }, { text, textLang, translateLang }) {
            try {
                commit('translatePending', { pending: true });
                let response;
                if (cacheTranslate.get(`${text}-${textLang}-${translateLang}`)) {
                    response = cacheTranslate.get(`${text}-${textLang}-${translateLang}`);
                } else {
                    response = await apiTranslate.translate(
                        queryString({
                            text: encodeURIComponent(text),
                            textLang,
                            translateLang,
                        })
                    );
                    cacheTranslate.set(`${text}-${textLang}-${translateLang}`, response);
                }
                if (response.status === 'error') {
                    throw response;
                }
                commit('translateSuccess', response);
            } catch (error) {
                commit('translateError', error);
                commit('showSnackBar', { message: error.message, color: 'error' }, { root: true });
            }
        },
        async translateByImage({ commit }, formData) {
            try {
                commit('translateByImagePending', { pending: true });
                const response = await apiTranslate.translateByImage(formData);
                if (response.status === 'error') {
                    throw response;
                }
                commit('translateByImageSuccess', response);
                commit('dictionaryModule/clearDictionaries', null, { root: true });
            } catch (error) {
                commit('translateByImageError', error);
                commit('showSnackBar', { message: error.message, color: 'error' }, { root: true });
            }
        },
    },
};
