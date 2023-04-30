import React, { FC } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "@/reportWebVitals";

// styles
import "@/index.css";

// pages
import NotFound from "@/pages/404";
import Home from "@/pages/Home";
import FileInput from "@/pages/FileInput";
import FileInput2 from "@/pages/FileInput2";

const Router: FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sample" element={<FileInput />} />
          <Route path="/hook" element={<FileInput2 />} />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
