import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function createAccount() {
        if (username.length > 0 && password.length > 0 && email.length > 0) {
            const account = {
                username: username,
                password: password,
                email: email,
                role: "guest",
            };
            const response = await fetch("http://localhost:5565/api/signup", {
                method: "POST",
                body: JSON.stringify(account),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log(data);
            console.log(account);
            if (data.success) {
                localStorage.setItem("username", account.username);
                navigate("/loggain");
            } else {
                alert("Already excists, Registera with anthoer name and password :)");
            }
        }

    }


    return (
        <section className="container">
            <section className="login-form">
                <h2 className="heading">Skapa Ett Konto</h2>
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
                <button className="btn" onClick={() => createAccount()}>
                    Skapa ett konto
                </button>
            </section>
        </section>
    );
}

export default SignupPage;