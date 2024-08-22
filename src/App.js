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
  return (
    <TargetedContext.Provider value={{ targetedElement, setTargetedElement }}>
      <Router>

        <DndProvider backend={HTML5Backend}>
          <div className="container-fluid mt-3 w-75">
            <nav className="mb-4 w-100 mx-auto alert alert-dark">
              <div style={{ width: "fit-content" }} className="d-flex mx-auto">
                <h3 className="me-3">Form Builder</h3>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "btn btn-dark mx-2" : "btn btn-secondary mx-2"
                  }
                >
                  Builder
                </NavLink>
                <NavLink
                  to="/preview"
                  className={({ isActive }) =>
                    isActive ? "btn btn-dark mx-2" : "btn btn-secondary mx-2"
                  }
                >
                  Preview
                </NavLink>
              </div>
            </nav>
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
