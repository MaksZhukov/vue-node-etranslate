import logger from '../../common/helpers/winston';
import speechToText from '../../common/helpers/speech';

class SpeechService {
    async speechToText({ speech }) {
        try {
            const response = await speechToText.recognize({
                audio: speech,
                contentType: 'audio/l16; rate=44100;',
            });
            return response.result.results;
        } catch (err) {
            console.log(err);
            logger.error(err);
            return { error: true };
        }
    }
}

export default new SpeechService();
