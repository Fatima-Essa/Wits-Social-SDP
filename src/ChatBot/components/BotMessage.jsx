import React, { useState, useEffect } from "react";
//this function handles a message object that is fetched from the bot
export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true); //initialization of variables to setup functionality of bot
  const [message, setMessage] = useState(""); //initialization of variables to setup functionality of bot

  useEffect(() => {
    async function loadMessage() {  //fetchs message from ui
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();  // loads message to object
  }, [fetchMessage]);

  return (    // prints response from bot
    <div className="message-container">
      <div className="bot-message">{isLoading ? "..." : message}</div>
    </div>
  );
}
