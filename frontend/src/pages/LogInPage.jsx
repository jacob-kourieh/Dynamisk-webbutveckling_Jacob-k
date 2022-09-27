import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../imgs/logo.svg";

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gustrole, setGustRole] = useState("guest");


    async function Login() {
        const user = {
            username: username,
            password: password,
            role: gustrole,
        };

        const response = await fetch("http://localhost:5565/api/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
            localStorage.setItem("username", data.user);
            sessionStorage.setItem("token", data.token);
            navigate("/CameraPage");
        } else {
            alert(
                "This account does not exist;)"
            );
        }
    }
    return (
        <section className="container">


            <section className="login-form">
                <img className="login-logo" src={logo} alt="" />
                <h1 className="start-h1">BRÖLLOPSFOTOGRAFEN</h1>
                <input
                    className=""
                    type="text"
                    id="username"
                    placeholder="Användarnamn"
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    type="password"
                    id="password"
                    placeholder="Lösenord"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>

                <button className="btn" onClick={() => Login()}>
                    Logga in
                </button>
                <button className="btn" onClick={() => navigate("/skapakonto")}>
                    Skapa Ett Konto
                </button>
                <button className="btn" onClick={() => navigate("/Admin")}>
                    Admin
                </button>
            </section>
        </section>
    );
}

export default LoginPage;
