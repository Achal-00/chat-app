import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8000");

export default function HomePage({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("chat", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat", { username, message });
    setMessage("");
  };

  return (
    <div className="relative p-4 w-full grid">
      <div className="w-[90%] md:w-1/2 justify-self-center grid gap-4 pb-20">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`bg-[#e7f9ff] py-2 px-4 rounded-lg grid gap-2 w-2/3 ${
              username === msg.username && "justify-self-end"
            }`}
          >
            <p className="text-sm text-gray-400">{msg.username}</p>
            <p className="pl-1">{msg.message}</p>
          </div>
        ))}
      </div>
      <form
        className="fixed bottom-[2rem] w-[90%] md:w-1/2 left-1/2 -translate-x-1/2 grid grid-cols-[8fr_1fr] shadow-md"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          className="bg-gray-100 text-gray-900 w-full h-full border-0 rounded-md p-2 pl-4 mb-4 outline-none col-start-1 col-end-3 row-start-1 row-end-2"
          placeholder="Type your message"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="col-start-2 col-end-3 row-start-1 row-end-2 w-12 justify-self-end pr-4">
          <img src="send-icon.svg" alt="send" className="" />
        </button>
      </form>
    </div>
  );
}
