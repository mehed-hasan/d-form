// src/App.js

import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import Preview from "./components/Preview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import { ToastContainer } from "react-toastify";
export const TargetedContext = createContext({
  targetedElement: null,
  setTargetedElement: () => {},
});

const App = () => {
  const [targetedElement, setTargetedElement] = useState(null);
  const mySave = () =>{

  }
  return (
    <TargetedContext.Provider value={{ targetedElement, setTargetedElement }}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <div className="container-fluid mt-3 w-75">

            <Routes>
              <Route path="/" element={<FormBuilder />} />
              <Route path="/preview" element={<Preview />} />
            </Routes>
            <ToastContainer autoClose={500} />
          </div>
        </DndProvider>
      </Router>
    </TargetedContext.Provider>
  );
};

export default App;
