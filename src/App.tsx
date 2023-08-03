import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Month from "./components/Month";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/"} element={<Month />} />
          <Route path={"/month"} element={<Month />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
