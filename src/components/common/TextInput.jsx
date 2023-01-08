import { useState } from "react";

export default function TextInput({ onSubmit }) {
  const [text, setText] = useState("");
  const handleSubmit = () => {
    if (text.trim() === "") return;
    onSubmit(text);
    setText("");
  };
  return (
    <div className="input-container">
      <input
        type="text"
        name="inputText"
        id="inputText"
        placeholder="Type Here"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSubmit();
        }}
      />
      <button className="input-btn" type="submit" onClick={handleSubmit}>
        <i className="fa-regular fa-paper-plane" style={{ fontSize: 24 }}></i>
      </button>
    </div>
  );
}
