import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import albumLogo from "../imgs/photoAlbum.svg";

function CameraPage() {
    const navigate = useNavigate();

    const videoRef = useRef(null);
    const photosRef = useRef(null);
    const [username, setUsername] = useState("");


    async function loggedIn() {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://localhost:5565/api/loggedin", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
    }
    loggedIn();


    async function takePhoto() {
        const width = 450;
        const height = width / (16 / 9);

        let video = videoRef.current;
        let dataUrl;

        let photo = photosRef.current;
        if (photo !== null) {
            photo.width = width;
            photo.height = height;

            let context = photo.getContext("2d");
            if (context !== null && video !== null) {
                context.drawImage(video, 0, 0, width, height);
                dataUrl = photo.toDataURL('image/jpeg', 0.5);
            }
        }

        const userInfo = {
            username: username,
            img: dataUrl
        };

        //fetch for take a photo
        const response = await fetch("http://localhost:5565/api/takefoto", {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        console.log(data);
        localStorage.setItem("photo", dataUrl);
        navigate("/TakenPhotoPage");
    }


    function getVideo() {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {

                let video = videoRef.current;
                if (video !== null) {
                    video.srcObject = stream;
                    video.play();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        const getUsername = localStorage.getItem("username");
        if (typeof getUsername === "string") {
            setUsername(getUsername);
        }
        getVideo(videoRef);
    }, [videoRef]);


    function logout() {
        navigate("/loggain")
        window.localStorage.clear();
        window.sessionStorage.clear();
    }

    return (
        <section className="camera-form">
            <h2 className="hello-heading">Hello {username} </h2>
            <img className="album-logo" src={albumLogo} onClick={() => navigate("/AlbumPage")} />
            <button className="logout-btn" onClick={() => logout()}>
                Logga ut
            </button>
            <video
                style={{ width: "400px" }}
                ref={videoRef}
            ></video>
            <button className="camera-btn" onClick={() => takePhoto()}>FÖREVIGA ETT ÖGONBLICK</button>
            <canvas ref={photosRef}></canvas>
        </section>
    );
}

export default CameraPage;