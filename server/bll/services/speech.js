import fs from 'fs';
import logger from '../../common/helpers/winston';
import speechToText from '../../common/helpers/speech';

class SpeechService {
    async speechToText({ speech }) {
        try {
            const response = await speechToText.recognize({
                audio: fs.createReadStream(speech.path),
                contentType: 'audio/mp3; rate=44100',
            });
            return response.result.results;
        } catch (err) {
            logger.error(err);
            return { error: true };
        }
    }
}

export default new SpeechService();
