const translate = (query) =>
    fetch(`api/translate?${query}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }).then((response) => response.json());

const translateByImage = (data) =>
    fetch(`api/translate/image`, {
        method: 'POST',
        body: data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }).then((response) => response.json());

export default {
    translate,
    translateByImage,
};
