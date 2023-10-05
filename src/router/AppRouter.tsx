import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const GamePage = lazy(() => import("../pages/GamePage"));
const ScoresPage = lazy(() => import("../pages/ScoresPage"));
const NoMatchPage = lazy(() => import("../pages/NoMatchPage"));

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />{" "}
        <Route path="/scores" element={<ScoresPage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
