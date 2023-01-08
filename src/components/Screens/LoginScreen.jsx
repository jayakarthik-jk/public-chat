import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (username.trim() === "") return;
    navigate(`/${username}`);
  };
  return (
    <div className="login-screen">
      <div className="login-container">
        <span className="login-text">Enter Username : </span>
        <div className="login-elements">
          <input
            type="text"
            name="username"
            id="username"
            className="login-input"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSubmit();
            }}
          />

          <button className="login-btn" onClick={handleSubmit}>
            <i
              className="fa-regular fa-paper-plane"
              style={{ fontSize: 24 }}
            ></i>
          </button>
        </div>
        <div className="login-terms">* Don't misuse the site</div>
      </div>
    </div>
  );
}

export default LoginScreen;
