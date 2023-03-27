import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Generate } from "./pages/Generate";
import { Profile } from "./pages/Profile";
import { QrCode } from "./pages/QrCode";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Generate />} />
        <Route path="/:username" element={<QrCode />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
