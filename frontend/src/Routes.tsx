import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Generate } from "./pages/Generate";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Generate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
