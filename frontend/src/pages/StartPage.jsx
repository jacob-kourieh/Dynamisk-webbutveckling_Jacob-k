import { useNavigate } from "react-router-dom";
import logo from "../imgs/logo.svg";
function StartPage() {
  const navigate = useNavigate();
  return (
    <section className="start-container">
      <img className="logo-start" src={logo} alt="" onClick={() => navigate("/loggain")} />
      <h1 className="start-h1">BRÖLLOPSFOTOGRAFEN</h1>
    </section>
  );
}

export default StartPage;


















/* import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  async function logIn() {
    let account = {
      username: loginUsername,
      password: loginPassword,
    };
    const response = await fetch("http://localhost:5565/api/login", {
      method: "POST",
      body: JSON.stringify(account),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    console.log(data.interests)

    if (data.succes) {
      sessionStorage.setItem('token', data.token);
      navigate("/loggedin", { state: { user: loginUsername, in: data.interests} });
    }
  }

  async function createAccount() {
    let account = {
      username: username,
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:5565/api/signup", {
      method: "POST",
      body: JSON.stringify(account),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    console.log(account);
  }

  return (
    <div>
      <h1>Loginsida</h1>
      <section>
        <h2>Skapa konto</h2>
        <input
          type="text"
          placeholder="username"
          className="form_input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          className="form_input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="form_input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form_button" onClick={() => createAccount()}>
          Skapa konto
        </button>
      </section>

      <section>
        <h2>Logga in</h2>
        <input
          type="text"
          placeholder="username"
          className="form_input"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="form_input"
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button className="form_button" onClick={() => logIn()}>
          Logga in
        </button>
      </section>
    </div>
  );
}

export default StartPage; */