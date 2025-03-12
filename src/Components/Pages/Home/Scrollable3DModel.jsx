import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Simple3DModelPage from "./Simple3DModelPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/3D_Effects/earth_globe_hologram_2mb_looping_animation.glb"
          element={<Simple3DModelPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
