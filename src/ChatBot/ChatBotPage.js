import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";

import API from "./ChatbotAPI";

import "./styles.css";
import Header from "./components/Header";


function ChatBotPage() {
  const [messages, setMessages] = useState([]);

  // This function uses the React Hook useEffect to perform an asynchronous action when the component mounts.
  //
  // It calls the loadWelcomeMessage function, which makes a request to the API to get a response from the chatbot.
  //
  // The response is then stored in the messages array, which is displayed to the user.

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse("hi")}
        />
      ]);
    }
    loadWelcomeMessage();
  }, []);

  // This function will take in some text and add it to the list of messages.
// It will also add a new BotMessage component to the list, which will fetch
// a response from the API.

  const send = async text => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
  };

  return (
      // This is a basic Chatbot structure. The Header, Messages, and Input components are rendered within the chatbot div. The chatbot div is then rendered within the box div.
      <div className= "box">
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
      </div>


  );
}

const rootElement = document.getElementById("root");  //Gets the root element from the document.
ReactDOM.render(<ChatBotPage />, rootElement);  //Renders the ChatBotPage into the root element.

export default ChatBotPage
