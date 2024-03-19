import { Route, Routes } from "react-router-dom";
import "./App.css";
import { client } from "./utils";
import * as Views from "./views";

function App() {
  console.log(client);
  return (
    <>
      <Routes>
        <Route path="/" element={<Views.Index />} />
        <Route path="/tasks" element={<Views.Task />} />
      </Routes>
    </>
  );
}

export default App;
