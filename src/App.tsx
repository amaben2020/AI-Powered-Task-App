import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navigation";
import * as Views from "./views";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Views.Index />} />
        <Route path="/tasks" element={<Views.Task />} />
      </Routes>
    </>
  );
}

export default App;
