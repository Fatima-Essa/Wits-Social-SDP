import React from "react";

// This is a presentational component for a user message.
// It expects to receive the text of the message as a prop.

export default function UserMessage({ text }) {
  return (
    <div className="message-container">
      <div className="user-message">{text}</div>
    </div>
  );
}
