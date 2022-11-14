// chatbot API that returns a response based on the message it is sent.

const { Configuration, OpenAIApi } = require("openai");

const key1 = "sk-08fmoiKh";
const key2 = "NEGggUqM"
const key3 = "wxmiT3BlbkF"
const key4 = "JX6P23A0M";
const key5 = "cZVzrqNltF40";


// Api config
const configuration = new Configuration({
  apiKey: key1 + key2 + key3 + key4 + key5,
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
