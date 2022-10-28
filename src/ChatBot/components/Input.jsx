import React, { useState } from "react";

// This file handles user input to chatbot
export default function Input({ onSend }) {
  const [text, setText] = useState("");

  // checks for change then sets user message to input
  const handleInputChange = e => {
    setText(e.target.value);
  };

  // handles sending of user message
  const handleSend = e => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  // Ui for entire bot
  return (
    <div className="input">
      {/*ui for entering message*/}
      <form onSubmit={handleSend}>
        <input
          type="text"
          onChange={handleInputChange}
          value={text}
          placeholder="Start talking"
        />
        {/*button for entering message*/}
        <button>
          {/*styling button*/}
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 500 500"
          >
            <g>
              <g>
                {/*styling box*/}
                <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
              </g>
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}
