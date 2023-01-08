function Message({ text, time, username = "unknown", sameUser = false, send }) {
  if (username.length > 20) {
    username = username.substring(0, 19) + "...";
  }
  return (
    <div
      className="message-container"
      style={{ marginTop: !sameUser ? "2rem" : 0 }}
    >
      {!sameUser && <div className={"arrow " + (send ? "right" : "left")} />}
      <div
        className={
          "message-content " +
          (send ? "right-message-content" : "left-message-content")
        }
      >
        {!sameUser && !send && (
          <span className="message-username">{username}</span>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{text}</span>
          <span className={"message-time " + (send ? "right" : "left")}>
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Message;
