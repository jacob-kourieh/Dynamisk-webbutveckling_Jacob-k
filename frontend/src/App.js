import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartPage from "./pages/StartPage";
import LogInPage from "./pages/LogInPage";
import SignupPage from "./pages/SignupPage";
import TakenPhotoPage from "./pages/TakenPhotoPage";
import CameraPage from "./pages/CameraPage";
import AlbumPage from "./pages/AlbumPage";
import AdminPage from "./pages/AdminPage";
import AdminAlbumPage from "./pages/AdminAlbumPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/skapakonto" element={<SignupPage />} />
          <Route path="/loggain" element={<LogInPage />} />
          <Route path='/CameraPage' element={<CameraPage />} />
          <Route path='/TakenPhotoPage' element={<TakenPhotoPage />} />
          <Route path='/AlbumPage' element={<AlbumPage />} />
          <Route path='/Admin' element={<AdminPage />} />
          <Route path='/AdminAlbum' element={<AdminAlbumPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
