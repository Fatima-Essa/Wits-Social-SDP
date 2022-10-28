import React, { useEffect, useRef } from "react";

//This code is responsible for displaying messages in a chat application.
// The Messages component takes in an array of messages as a prop.
// The useEffect hook is used to scroll to the bottom of the page when a new message is added.
// The messages are rendered in a div with the class name of "messages".
// There is also a div with the id of "el" and a ref of el.
// This div is used as a reference point to scroll to the bottom of the page.

export default function Messages({ messages }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  return (
    <div className="messages">
      {messages}
      <div id={"el"} ref={el} />
    </div>
  );
}
