import React, { FC } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// styles
import "@/index.css";

// pages
import NotFound from "@/pages/404";
import Home from "@/pages/Home";
import FileInputSample from "@/pages/FileInputSample";
import FileInputSampleWithHook from "@/pages/FileInputSampleWithHook";

const Router: FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sample" element={<FileInputSample />} />
          <Route path="/hook" element={<FileInputSampleWithHook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Router />);
