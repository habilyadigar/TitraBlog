import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./components/Home";
import PostsList from "./components/PostList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />
      <Header />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={PostsList} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
