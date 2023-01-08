import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

import Message from "../common/Message";
import TextInput from "../common/TextInput";
import { useParams } from "react-router-dom";

const socket = io("https://public-chat-server.onrender.com");

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const lastMessage = useRef();
  const { username } = useParams();

  let messagesEnd;

  const getCurrentTime = () => {
    let hour = new Date(Date.now()).getHours();
    const minute = new Date(Date.now()).getMinutes();
    const session = hour < 12 ? "AM" : "PM";
    if (hour === 0) hour = 12;

    return hour + ":" + minute + " " + session;
  };
  const handleInput = (text) => {
    let sameUser = false;
    if (lastMessage.current?.send) {
      sameUser = true;
    }
    const key = uuid();
    const time = getCurrentTime();
    const currentMessage = {
      key,
      text,
      time,
      username: username,
      sameUser,
      send: true,
    };
    setMessages((allMessages) => {
      return [...allMessages, currentMessage];
    });
    lastMessage.current = currentMessage;
    socket.emit("send_message", {
      key,
      text,
      time,
      username: username,
    });
  };
  const handleIncomingMessage = (message) => {
    const newMessage = {
      key: message.key,
      text: message.text,
      time: message.time,
      username: message.username,
      send: false,
      sameUser: lastMessage.current
        ? lastMessage.current.username === message.username
        : false,
    };
    setMessages((allMessages) => {
      return [...allMessages, newMessage];
    });
    lastMessage.current = newMessage;
  };

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  const handleUserJoin = (username) => {
    setMessages((old) => [
      ...old,
      { label: true, name: username, key: uuid() },
    ]);
  };
  const handleUserLeft = (username) => {
    setMessages((old) => [
      ...old,
      { label: true, name: username, left: true, key: uuid() },
    ]);
  };
  useEffect(() => {
    socket.emit("join_room", username);
  }, []);
  useEffect(() => {
    socket.on("receive_message", handleIncomingMessage);
    socket.on("user_joined", handleUserJoin);
    socket.on("user_left", handleUserLeft);
  }, [socket]);
  useEffect(() => {
    scrollToBottom();
  });

  return (
    <>
      <main>
        {messages.map((message) =>
          message.label ? <NewUser {...message} /> : <Message {...message} />
        )}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            messagesEnd = el;
          }}
        ></div>
      </main>
      <TextInput onSubmit={handleInput} />
    </>
  );
}

function NewUser({ name, left = false }) {
  return (
    <div className="new-user-container">
      <div className="new-user">
        {name + (left ? " left the room" : " joined the room")}
      </div>
    </div>
  );
}

export default ChatScreen;
