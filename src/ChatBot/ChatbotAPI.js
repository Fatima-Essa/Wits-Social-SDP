// chatbot API that returns a response based on the message it is sent.

const { Configuration, OpenAIApi } = require("openai");

// Api config
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


// api main
const API = {


  // get response from prompt
  GetChatbotResponse: async message => {

    message = "You are a chatbot for a social media app that talks to users. User: " +  message + ".";

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: message,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const text = response['data']['choices'][0]['text']

    // Fetch and resolve response
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (message === "hi") resolve("Welcome to chatbot!");
        else resolve(text);
      }, 2000);
    });



  }


};

export default API;
