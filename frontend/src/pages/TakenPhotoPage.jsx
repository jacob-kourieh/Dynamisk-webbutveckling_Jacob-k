import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import albumLogo from "../imgs/photoAlbum.svg";
function TakenPhotoPage() {
    let getPhoto = localStorage.getItem("photo");

    const photoRef = useRef(null);
    const navigate = useNavigate();
    function takeNewPic() {
        navigate("/CameraPage");
    }

    useEffect(() => {
        let photo = photoRef.current;
        photo.src = getPhoto;
    }, []);

    return (
        <section className="camera-form">
            <img
                className="album-logo"
                src={albumLogo}
                onClick={() => navigate("/AlbumPage")}
            ></img>
            <img className="camera-cap" ref={photoRef} />
            <button className="camera-btn" onClick={takeNewPic}>
                FÅNGA ETT NYTT ÖGONBLICK
            </button>
        </section>
    );
}

export default TakenPhotoPage;