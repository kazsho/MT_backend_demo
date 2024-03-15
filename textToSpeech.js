/* 
    This file demonstrates how to use OpenAI's Audio API
    to generate speech from text in Gujarati (Gujarati characters)
    and save it as an audio file, locally. 
    You could also include English text in the same input string; 
    the model should be able to handle both.
*/

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Specify where the speech file should be saved
const speechFile = path.resolve("./speech.mp3");

async function main() {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",  // Slightly lower latency 
        voice: "nova",  // Nova has been deemed the best voice for Gujarati speech
        input: "હેલો, મારું નામ સિમા છે. હું હજી ગુજરાતી શીખી રહી છું, તો મારી ગુજરાતી થોડી નબળી છે.",
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer)
        .then(() => console.log("Speech file saved to: ", speechFile));
}
main();