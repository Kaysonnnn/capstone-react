import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { generateRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {generateRoutes()}
      </Routes>
    </BrowserRouter>
  )
}

export default App
