/* 
    This file demonstrates how to use Google Cloud Speech-to-Text
    to transcribe Gujarati speech saved locally as a `.flac` audio file
    into plain text in Gujarati characters. 
*/

const speech = require('@google-cloud/speech');
const fs = require('fs');

// Create a new Google Cloud 'client' instance
const client = new speech.SpeechClient({
    keyFilename: './key.json', // Google Cloud credentials stored here
});

async function speechToText(audioFilePath) {
    try {
        // Read a local audio file and convert it to base64 encoded text
        const file = fs.readFileSync(audioFilePath);
        const audioBytes = file.toString('base64');

        // Configure the request to Google Cloud 
        const audio = {
            content: audioBytes,
        };
        const config = {
            encoding: 'FLAC',
            sampleRateHertz: 48000, // This must be the same as the file! 
            languageCode: 'gu-IN', // Language code for Gujarati
            audioChannelCount: 1, // This also must be the same as the file! 
            enableSeparateRecognitionPerChannel: false,
        };
        const request = {
            audio: audio,
            config: config,
        };

        // Make the request 
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');

        return transcription;
    } catch (error) {
        console.error('ERROR:', error);
    }
}

(async () => {
    // Call the function, with the filepath of a `.flac` audio file
    const transcribedText = await speechToText('audio/guj-audio-01.flac');
    // Log our results, for demo purposes
    console.log(transcribedText);
})();