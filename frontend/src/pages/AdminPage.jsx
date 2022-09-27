import { useNavigate } from "react-router-dom";
import { useState } from "react";


function AdminPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [adminRole, setAdminRole] = useState("admin");


    async function adminLogin() {
        const user = {
            username: username,
            password: password,
            role: adminRole,
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
            navigate("/AdminAlbum");
        } else {
            alert(
                "This account don't exist ;)"
            );
        }
    }


    return (
        <section className="container">
            <section className="login-form">
                <h2 className="heading">Admin</h2>
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
                <button className="btn" onClick={() => adminLogin()} >Logga in</button>
            </section>
        </section>
    );
}

export default AdminPage;