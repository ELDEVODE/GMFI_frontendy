import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/Game/GamePage";
import Layout from "./components/Layout";

// New import for GameLayout
import GameLayout from "./components/GameLayout";
import { SinglePlayer } from "./pages/Game/SinglePlayer";
import { MultiplayerPoints } from "./pages/Game/MultiplayerPoints";
import { MultiplayerStakes } from "./pages/Game/MultiplayerStakes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          {/* Add other page routes here */}
        </Route>

        {/* game Landing */}
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/single-player" element={<SinglePlayer />} />
        <Route path="/game/multiplayer-points" element={<MultiplayerPoints />} />
        <Route path="/game/multiplayer-stakes" element={<MultiplayerStakes />} />

        {/* Game with GameLayout */}
        {/* <Route element={<GameLayout />}>
          
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
