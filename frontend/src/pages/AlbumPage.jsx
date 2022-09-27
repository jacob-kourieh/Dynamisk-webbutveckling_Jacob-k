import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cameraLogo from "../imgs/logo.svg";
import close from "../imgs/closeIcon.svg";

function AlbumPage() {
    const user = localStorage.getItem("username");
    const [pictures, setPictures] = useState([]);

    const navigate = useNavigate();

    async function getAlbum() {
        const reqObj = {
            username: user,
        };
        const response = await fetch("http://localhost:5565/api/album", {
            method: "POST",
            body: JSON.stringify(reqObj),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
            setPictures(data.allImages);
        }
    }

    useEffect(() => {
        getAlbum();

    }, []);

    async function deletePhoto(pic) {
        const reqObj = {
            user: user,
            img: pic,
        };
        const response = await fetch("http://localhost:5565/api/deletephoto", {
            method: "DELETE",
            body: JSON.stringify(reqObj),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.success === true) {


            getAlbum();
        }
    }


    function logout() {
        navigate("/loggain")
        window.localStorage.clear();
        window.sessionStorage.clear();
    }


    return (
        <section className="album-container">
            <img
                className="album-logo"
                src={cameraLogo}
                alt=""
                onClick={() => navigate("/CameraPage")}
            />
            <button className="logout-btn" onClick={() => logout()}>
                Logga ut
            </button>

            {pictures.map((pic, i) => (
                <article className="img-form" key={i}>
                    <img className="album-pic" src={pic}></img>

                    <img
                        src={close}
                        className="remove-btn"
                        onClick={() => deletePhoto(pic)}
                    ></img>

                </article>
            ))}
        </section>
    );
}

export default AlbumPage;
