/* 
    This file demonstrates how to use send an API request to OpenAI
    to prompt GPT-3.5, or GPT-4. 
    It also includes a command-line interface for conversing with GPT, 
    for demonstration and prototyping purposes.  
*/

const OpenAI = require('openai');
require('dotenv').config();
const readline = require('readline');

// Initialise the OpenAI client process
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Initialise the 'conversation array', with a 'system message' the user doesn't see. 
const conversationArray = [
    {
        role: 'system',
        // Give the model initial instructions, so it knows what it's job is. 
        // Consider adding lots of contextual information here! 
        content: "You are a helpful language tutor. Your job is to help the user learn Gujarati..."
    }
];

async function callOpenAI() {
    const chatCompletion = await openai.chat.completions.create({
        messages: conversationArray,
        model: 'gpt-3.5-turbo',
        // model: 'gpt-4'  // Pick which model ...
        max_tokens: 150,  // The length of the response text
        temperature: 1,  // How excited the model is: 0 is boring, 2 is completely mad
    });
    // Returns only the model's most recent response
    return chatCompletion.choices[0].message.content;
}


(async () => {
    // For demo purposes, we will make a conversational interface on the command line
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    async function chat() {
        rl.question('You: ', async (userInput) => {
            // Keep track of what the user asked
            conversationArray.push({
                role: 'user',
                content: userInput
            });

            // Prompt the AI model
            const reply = await callOpenAI();
            // Add the message from GPT to the conversation array
            conversationArray.push({
                role: 'assistant',
                content: reply
            });
            // Display the message from GPT in the command line
            console.log('GPT: ', reply);

            // Continue the command line chat indefinitely
            chat();
        });
    }
    // Start the conversation in the command line 
    chat();
})()
